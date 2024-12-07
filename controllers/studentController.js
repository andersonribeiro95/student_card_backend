// controllers/studentController.js
const Student = require("../models/Student");

exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find({ userId: req.user._id });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Erro do servidor" });
  }
};

exports.getStudent = async (req, res) => {
  try {
    const student = await Student.find({ userId: req.user._id, _id: req.params.id });
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: "Erro do servidor" });
  }
};

exports.createStudent = async (req, res) => {
  const { name, cpf, birthDate, institution, course, issuer, validity } =
    req.body;
  const profilePicture = req.file ? req.file.path : null;

  try {
    const student = new Student({
      name,
      cpf,
      birthDate,
      institution,
      course,
      issuer,
      validity,
      userId: req.user._id,
      profilePicture,
    });

    const createdStudent = await student.save();
    res.status(201).json(createdStudent);
  } catch (error) {
    res.status(400).json({ message: "Erro ao criar estudante" });
  }
};

exports.updateStudent = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  if (req.file) {
    updatedData.profilePicture = req.file.path;
  }

  try {
    const student = await Student.findById(id);

    if (student.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Não autorizado" });
    }

    const updatedStudent = await Student.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    res.json(updatedStudent);
  } catch (error) {
    res.status(400).json({ message: "Erro ao atualizar estudante" });
  }
};

exports.deleteStudent = async (req, res) => {
  const { id } = req.params;

  try {
    const student = await Student.findById(id);
    
    if (student.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Não autorizado" });
    }
    
    await student.deleteOne({ _id: id });
    res.json({ message: "Estudante removido" });
  } catch (error) {
    res.status(400).json({ message: "Erro ao apagar estudante" });
  }
};