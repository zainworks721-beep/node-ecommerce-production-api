
import User from '../model/user.model.js';


const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        if (!users) {
            res.status(404).json({ status: '404', message: 'Users not found' });
            return
        }
        if (users) {
            res.status(200).json({ status: '200', data: users, total: users.length, message: 'Users fetched successfully' });
        }

    } catch (error) {
        next(error);
    }
}

const getUserById = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const userById = await User.findById(userId);

        if (!userById) {
            res.status(404).json({ status: '404', message: 'User not found' });
            return
        }
        if (userById) {
            res.status(200).json({ status: '200', data: userById, message: 'User fetched successfully' });
        }

    } catch (error) {
        next(error);
    }
}

const createUser = async (req, res, next) => {
    try {

        const { username, email, password } = req.body;
        const newsUser = await User.create({ username, email, password });

        if (!newsUser) {
            res.status(400).json({ status: '400', message: 'User not created' });
            return
        }

        if (newsUser) {
            res.status(201).json({ status: '201', data: newsUser, message: 'User created successfully' });
        }

    } catch (error) {

        next(error)
    }
}


const updateUser = async (req, res, next) => {
    try {

        const userId = req.params.id;
        const { username, email, } = req.body;

        const updateData = {}

        if (username !== undefined && username.trim() !== "") updateData.username = username.trim();
        if (email !== undefined && email.trim() !== "") updateData.email = email.trim();

        if (Object.keys(updateData).length === 0) {
            res.status(400).json({
                status: '400',
                message: 'Please provide at least one valid field to update (username or email).'
            });
            return;
        }
        const updatedUser = await User.findByIdAndUpdate(userId, updateData,
            { new: true });

        if (!updatedUser) {
            res.status(404).json({ status: '404', message: 'User not found' });
            return
        }

        if (updatedUser) {
            res.status(200).json({ status: '200', data: updatedUser, message: 'User updated successfully' });
        }

    }
    catch (error) {
        console.log(error)
        next(error);
    }
}

const delUser = async (req, res, next) => {
    const userId = req.params.id;

    try {

        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            res.status(404).json({ status: '404', message: 'User not found' });
            return
        }
        if (deletedUser) {
            res.status(200).json({ status: '200', data: deletedUser, message: 'User deleted successfully' });
        }

    } catch (error) {
        next(error);
    }
}


export {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    delUser
}