import Assessment from "../Models/assessmentModel.js";
import { errorHandler } from "../utils/error.js";

export const createAssessment = async (req, res, next) => {
  try {
    const assessment = await Assessment.create(req.body);
    return res.status(201).json(assessment);
  } catch (error) {
    next(error);
  }
};

export const deleteAssessment = async (req, res, next) => {
  const assessment = await Assessment.findById(req.params.id);

  if (!assessment) {
    return next(errorHandler(404, "Assessment not found!"));
  }

  try {
    await Assessment.findByIdAndDelete(req.params.id);
    res.status(200).json("Assessment has been deleted!");
  } catch (error) {
    next(error);
  }
}; 

export const updateAssessment = async (req, res, next) => {
  const assessment = await Assessment.findById(req.params.id);
  if (!Assessment) {
    return next(errorHandler(404, "Assessment not found!"));
  }

  try {
    const updatedAssessment = await Assessment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedAssessment);
  } catch (error) {
    next(error);
  }
};

export const getAssessment = async (req, res, next) => {
  try {
    const assessment = await Assessment.findById(req.params.id);
    if (!assessment) {
      return next(errorHandler(404, "Assessment not found!"));
    }
    res.status(200).json(Assessment);
  } catch (error) {
    next(error);
  }
};

export const getAssessments = async (req, res, next) => {
  try {
    const assessments = await Assessment.find();
    res.status(200).json({
      status: "success",
      result: assessments.length,
      data: assessments,
    });
  } catch (error) {
    next(error);
  }
};
