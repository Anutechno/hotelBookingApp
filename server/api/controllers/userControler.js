import Users from "../models/Users.js";

export const updateUsers = async (req, res, next) => {
    const updateUsers = await Users.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, { new: true })

    try {
        const saveUsers = await updateUsers.save();
        res.status(200).json(saveUsers);
    } catch (err) {
        res.status(500).json(err)
    }
}

export const deleteUsers = async (req, res, next) => {
    try {
        await Users.findByIdAndDelete(req.params.id)
        res.status(200).json("User deleted");
    } catch (err) {
        res.status(500).json(err)
    }

}
export const getUser = async (req, res, next) => {
    try {
        const User = await Users.findById(req.params.id)
        res.status(200).json(User);
    } catch (err) {
        res.status(500).json(err)
    }
}
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await Users.find(req.params.id)
        res.status(200).json(users);
    } catch (err) {
        next(err)
    }

}

