// ДЗ:
//     Винести базу даних в json.file, при створенні записувати туда нових юзерів через fs
// При створенні валідацію на імія і вік, імя повинно бути більше 2 символів, вік – не менше нуля
// На гет, пут, деліт юзерів перевірити чи такий юзер є

const express = require('express');
const fs = require('node:fs/promises');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const usersFilePath = path.join(__dirname, 'users.json');

app.post('/users', async (req, res) => {
    try {

        const {name, age, gender} = req.body;
        if (name && name.length <= 2) {
            throw new Error("Name must to have more than 2 character!");
            return;
        }
        if (age && age <= 0) {
            throw new Error("Age mustn't to be equal 0 or less then 0!");
            return;
        }
        if (gender && (gender !== "male" && gender !== "female")) {
            throw new Error("Gender must be 'male' or 'female'!");
            return;
        }

        const fileData = await fs.readFile(usersFilePath);
        const users = JSON.parse(fileData.toString());

        users.push({id: users.length + 1, ...req.body});

        await fs.writeFile(usersFilePath, JSON.stringify(users));
        res.json(users).status(201);

    } catch (e) {
        res.json(e.message).status(400);
    }
});

app.get('/users', async (req, res) => {
    try {

        const fileData = await fs.readFile(usersFilePath);
        res.json(JSON.parse(fileData.toString())).status(200);

    } catch (e) {
        res.json(e.message).status(400);
    }
});

app.get('/users/:id', async (req, res) => {
    try {

        const fileData = await fs.readFile(usersFilePath);
        const users = JSON.parse(fileData.toString());

        const userById = users.find(user => user.id === Number(req.params.id));
        if (!userById) {
            throw new Error('User does not exist!');
            return;
        }
        res.json(userById).status(200);

    } catch (e) {
        res.json(e.message).status(400);
    }
});

app.put('/users/:id', async (req, res) => {
    try {
        const fileData = await fs.readFile(usersFilePath);
        const users = JSON.parse(fileData.toString());
        const userId = Number(req.params.id);
        const {name, age, gender} = req.body;

        const index = users.findIndex((user) =>user.id === userId);
        if (!index) {
            throw new Error('User does not exist!');
            return;
        }

        if (name && name.length <= 2) {
            throw new Error("Name must to have more than 2 character!");
            return;
        }
        if (age && age <= 0) {
            throw new Error("Age mustn't to be equal 0 or less then 0!");
            return;
        }
        if (gender && (gender !== "male" && gender !== "female")) {
            throw new Error("Gender must be 'male' or 'female'!");
            return;
        }

        users[index] = {...users[index], ...req.body};

        await fs.writeFile(usersFilePath, JSON.stringify(users));
        res.json(users).status(201);

    } catch (e) {
        res.json(e.message).status(400);
    }
});

app.delete('/users/:id', async (req, res) => {
    try {
        const fileData = await fs.readFile(usersFilePath);
        const users = JSON.parse(fileData.toString());

        const deletedUser = users.filter((user, index, array) => {
            if (user.id === Number(req.params.id)) {
                array.splice(index, 1);
                return user;
            }
        });
        if (!deletedUser) {
            throw new Error('User does not exist!');
            return;
        }

        res.json(deletedUser[0]).status(200);
    } catch (e) {
        res.json(e.message).status(400);
    }

});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server has started on ${PORT} port`)
});

