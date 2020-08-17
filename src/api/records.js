const express = require('express');
const monk = require('monk');
const { body, validationResult } = require('express-validator');
const helpers = require('../helpers');

const router = express.Router();
const db = monk(process.env.MONGO_URI);
const collection = db.get('records');

router.post('/', [
  body('minCount').isInt(),
  body('maxCount').isInt(),
  body('startDate').isDate(),
  body('endDate').isDate()
], async (req, res, next) => {
  const error = validationResult(req).formatWith(helpers.errorFormatter);

  if (!error.isEmpty()) {
    res.status(400);
    return next(new Error(error.array()));
  }

  const records = await collection.aggregate([
    {
      $project: {
        counts: 1,
        createdAt: 1,
        key: 1
      }
    },
    {
      $match: {
        createdAt: {
          $gte: new Date(req.body.startDate),
          $lte: new Date(req.body.endDate)
        },
      }
    },
    {
      $unwind: '$counts'
    },
    {
      $group: {
        _id: '$_id',
        createdAt: {
          $first: '$createdAt'
        },
        totalCount: {
          $sum: '$counts'
        },
        key: {
          $first: '$key'
        }
      }
    },
    {
      $match: {
        totalCount: {
          $gte: req.body.minCount,
          $lte: req.body.maxCount
        },
      }
    },
    {
      $unset: '_id'
    }
  ]);

  if (!records.length) {
    res.status(404);
    return next(new Error('No records found'));
  }

  return res.json(helpers.getRespObj(200, 'success', records));
});

module.exports = router;
