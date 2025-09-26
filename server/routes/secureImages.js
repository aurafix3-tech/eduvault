const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const { auth } = require('../middleware/auth');
const Resource = require('../models/Resource');

// Test route to verify the secure-images path is working
router.get('/test', (req, res) => {
  console.log('🧪 Test route hit - secure-images is working!');
  res.json({ message: 'Secure images route is working!', timestamp: new Date().toISOString() });
});

// Secure image serving endpoint with authentication
router.get('/:type/:id', auth, async (req, res) => {
  try {
    const { type, id } = req.params;
    const userId = req.user.id;
    
    console.log(`🔍 Image request received: type=${type}, id=${id}, user=${userId}`);

    // Validate assessment type
    if (!['cats', 'pastExams', 'assignments'].includes(type)) {
      console.log(`❌ Invalid assessment type: ${type}`);
      return res.status(400).json({
        success: false,
        message: 'Invalid assessment type'
      });
    }

    // Find the assessment in the database
    console.log(`🔍 Looking for assessment: type=${type}, id=${id}`);
    
    const mongoose = require('mongoose');
    const Course = require('../models/Course');
    
    // Validate MongoDB ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log(`❌ Invalid ObjectId format: ${id}`);
      return res.status(400).json({
        success: false,
        message: 'Invalid assessment ID format'
      });
    }

    // Find the assessment in all courses
    const courses = await Course.find({});
    let foundAssessment = null;
    let assessmentType = null;

    for (const course of courses) {
      for (const unit of course.units) {
        if (unit.assessments) {
          // Check cats
          if (type === 'cats' && unit.assessments.cats) {
            foundAssessment = unit.assessments.cats.id(id);
            if (foundAssessment) {
              assessmentType = 'cats';
              break;
            }
          }
          // Check pastExams
          if (type === 'pastExams' && unit.assessments.pastExams) {
            foundAssessment = unit.assessments.pastExams.id(id);
            if (foundAssessment) {
              assessmentType = 'pastExams';
              break;
            }
          }
          // Check assignments
          if (type === 'assignments' && unit.assessments.assignments) {
            foundAssessment = unit.assessments.assignments.id(id);
            if (foundAssessment) {
              assessmentType = 'assignments';
              break;
            }
          }
        }
      }
      if (foundAssessment) break;
    }

    if (!foundAssessment) {
      console.log(`❌ Assessment not found: ${type}/${id}`);
      return res.status(404).json({
        success: false,
        message: 'Assessment not found'
      });
    }

    console.log(`✅ Found assessment: ${foundAssessment.title}`);
    console.log(`📁 Filename: ${foundAssessment.filename}`);

    // Check if user has access (only approved assessments)
    if (foundAssessment.status !== 'approved') {
      console.log(`❌ Assessment not approved: status=${foundAssessment.status}`);
      return res.status(403).json({
        success: false,
        message: 'Assessment not yet approved for viewing'
      });
    }

    // Construct file path
    const uploadsDir = path.join(__dirname, '..', 'uploads');
    const filePath = path.join(uploadsDir, 'assessments', foundAssessment.filename);
    
    console.log(`📂 Looking for file at: ${filePath}`);
    console.log(`📂 File exists: ${fs.existsSync(filePath)}`);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.log(`❌ Assessment file not found: ${filePath}`);
      
      // Return placeholder as fallback
      const placeholderPath = path.join(__dirname, '..', 'public', 'placeholder-assessment.svg');
      if (fs.existsSync(placeholderPath)) {
        console.log(`🔄 Serving placeholder as fallback`);
        res.set('Content-Type', 'image/svg+xml');
        return res.sendFile(placeholderPath);
      }
      
      return res.status(404).json({
        success: false,
        message: 'Assessment file not found on server'
      });
    }

    // Set security headers to prevent caching and downloading
    res.set({
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'Content-Disposition': 'inline',
      'X-Robots-Tag': 'noindex, nofollow, nosnippet, noarchive'
    });

    // Determine content type based on file extension
    const ext = path.extname(filePath).toLowerCase();
    let contentType = 'application/octet-stream';
    
    if (['.jpg', '.jpeg'].includes(ext)) {
      contentType = 'image/jpeg';
    } else if (ext === '.png') {
      contentType = 'image/png';
    } else if (ext === '.gif') {
      contentType = 'image/gif';
    } else if (ext === '.svg') {
      contentType = 'image/svg+xml';
    } else if (ext === '.pdf') {
      contentType = 'application/pdf';
    } else if (ext === '.webp') {
      contentType = 'image/webp';
    }

    res.set('Content-Type', contentType);

    console.log(`✅ Serving assessment file: ${foundAssessment.filename}`);
    console.log(`📊 Content-Type: ${contentType}`);

    // Stream the file
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);

    // Log successful access
    fileStream.on('end', () => {
      console.log(`✅ Secure image served: ${type}/${id} to user ${userId}`);
    });

    fileStream.on('error', (error) => {
      console.error(`❌ Error serving secure image: ${error.message}`);
      if (!res.headersSent) {
        res.status(500).json({
          success: false,
          message: 'Error serving assessment file'
        });
      }
    });

  } catch (error) {
    console.error('Error in secure image endpoint:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get assessment metadata for secure viewing
router.get('/metadata/:type/:id', auth, async (req, res) => {
  try {
    const { type, id } = req.params;
    const userId = req.user.id;
    
    console.log(`📊 Metadata request: type=${type}, id=${id}, user=${userId}`);

    // Validate assessment type
    if (!['cats', 'pastExams', 'assignments'].includes(type)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid assessment type'
      });
    }

    // Find the assessment in the database
    console.log(`🔍 Looking for assessment metadata: type=${type}, id=${id}`);
    
    const mongoose = require('mongoose');
    const Course = require('../models/Course');
    
    // Validate MongoDB ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log(`❌ Invalid ObjectId format: ${id}`);
      return res.status(400).json({
        success: false,
        message: 'Invalid assessment ID format'
      });
    }

    // Find the assessment in all courses
    const courses = await Course.find({}).populate('institution', 'name shortName');
    let foundAssessment = null;
    let foundCourse = null;
    let foundUnit = null;

    for (const course of courses) {
      for (const unit of course.units) {
        if (unit.assessments) {
          // Check cats
          if (type === 'cats' && unit.assessments.cats) {
            foundAssessment = unit.assessments.cats.id(id);
            if (foundAssessment) {
              foundCourse = course;
              foundUnit = unit;
              break;
            }
          }
          // Check pastExams
          if (type === 'pastExams' && unit.assessments.pastExams) {
            foundAssessment = unit.assessments.pastExams.id(id);
            if (foundAssessment) {
              foundCourse = course;
              foundUnit = unit;
              break;
            }
          }
          // Check assignments
          if (type === 'assignments' && unit.assessments.assignments) {
            foundAssessment = unit.assessments.assignments.id(id);
            if (foundAssessment) {
              foundCourse = course;
              foundUnit = unit;
              break;
            }
          }
        }
      }
      if (foundAssessment) break;
    }

    if (!foundAssessment) {
      console.log(`❌ Assessment not found: ${type}/${id}`);
      return res.status(404).json({
        success: false,
        message: 'Assessment not found'
      });
    }

    console.log(`✅ Found assessment metadata: ${foundAssessment.title}`);

    // Return real assessment metadata
    return res.json({
      success: true,
      data: {
        id: foundAssessment._id,
        title: foundAssessment.title,
        type: type,
        course: {
          name: foundCourse.name,
          code: foundCourse.code,
          institution: foundCourse.institution?.name
        },
        unitName: foundUnit.unitName,
        unitYear: foundUnit.year,
        unitSemester: foundUnit.semester,
        description: foundAssessment.description || `${type.toUpperCase()} assessment for ${foundUnit.unitName}`,
        totalMarks: foundAssessment.totalMarks || (type === 'cats' ? 30 : 100),
        duration: foundAssessment.duration || (type === 'cats' ? 60 : 180),
        instructions: foundAssessment.instructions || 'Read all questions carefully. No external materials allowed. This is a secure assessment environment.',
        dueDate: foundAssessment.dueDate,
        uploadDate: foundAssessment.uploadDate,
        hasFile: !!foundAssessment.filename,
        fileType: foundAssessment.filename ? path.extname(foundAssessment.filename) : null,
        status: foundAssessment.status,
        isPremium: foundAssessment.isPremium || false,
        reviewNotes: foundAssessment.reviewNotes
      }
    });

  } catch (error) {
    console.error('Error fetching assessment metadata:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Log assessment viewing session
router.post('/log-access', auth, async (req, res) => {
  try {
    const { assessmentId, assessmentType, action, timestamp } = req.body;
    const userId = req.user.id;

    // Log the access (you can store this in a database table for audit)
    console.log(`📊 Assessment Access Log:`, {
      userId,
      assessmentId,
      assessmentType,
      action,
      timestamp,
      userAgent: req.get('User-Agent'),
      ip: req.ip
    });

    // Here you could save to an AccessLog model if needed
    // const accessLog = new AccessLog({ userId, assessmentId, assessmentType, action, timestamp });
    // await accessLog.save();

    res.json({
      success: true,
      message: 'Access logged successfully'
    });

  } catch (error) {
    console.error('Error logging assessment access:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Catch-all route for debugging
router.get('*', (req, res) => {
  console.log(`🔍 Catch-all route hit: ${req.method} ${req.originalUrl}`);
  console.log(`🔍 Params:`, req.params);
  console.log(`🔍 Query:`, req.query);
  res.status(404).json({ 
    message: 'Route not found in secure-images', 
    method: req.method,
    url: req.originalUrl,
    params: req.params
  });
});

module.exports = router;
