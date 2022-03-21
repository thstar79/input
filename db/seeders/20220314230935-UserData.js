"use strict";
const Data = require('./Data/userSeedData');

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            "Users",
            [
                {
                    firstName: "D",
                    lastName: "Mo",
                    userName: "DemoUser",
                    email: "demo@demo.com",
                    hashedPassword:
                        "$2a$10$TCsMTRaBL7jRbUAT/Uyg5uUr3lZfl7afFTc0q.gzmTLq44BOXvcZu",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    firstName: "Bread",
                    lastName: "Simpson",
                    userName: "SourdoughBrad",
                    email: "dad@jokes.com",
                    hashedPassword:
                        "$2a$10$TCsMTRaBL7jRbUAT/Uyg5uUr3lZfl7afFTc0q.gzmTLq44BOXvcZu",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    firstName: "Taehoon",
                    lastName: "Kim",
                    userName: "TaehoonK",
                    email: "taehoon@gmail.com",
                    hashedPassword:
                        "$2a$10$TCsMTRaBL7jRbUAT/Uyg5uUr3lZfl7afFTc0q.gzmTLq44BOXvcZu",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    firstName: "Steve",
                    lastName: "Choi",
                    userName: "ChoiCes",
                    email: "steve@choi.com",
                    hashedPassword:
                        "$2a$10$TCsMTRaBL7jRbUAT/Uyg5uUr3lZfl7afFTc0q.gzmTLq44BOXvcZu",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    firstName: "Jared",
                    lastName: "Kunhart",
                    userName: "Purity",
                    email: "purity@purity.com",
                    hashedPassword:
                        "$2a$10$TCsMTRaBL7jRbUAT/Uyg5uUr3lZfl7afFTc0q.gzmTLq44BOXvcZu",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    firstName: "Michelle",
                    lastName: "Evans",
                    userName: "Warwatch",
                    email: "cleora1997@ezmail.com",
                    hashedPassword:
                        "$2a$10$TCsMTRaBL7jRbUAT/Uyg5uUr3lZfl7afFTc0q.gzmTLq44BOXvcZu",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    firstName: "Bernard",
                    lastName: "McLaughlin",
                    userName: "Dreadphobia",
                    email: "z89pa@roidirt.com",
                    hashedPassword:
                        "$2a$10$TCsMTRaBL7jRbUAT/Uyg5uUr3lZfl7afFTc0q.gzmTLq44BOXvcZu",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    firstName: "Michael",
                    lastName: "Garcia",
                    userName: "IHasEars",
                    email: "MichaelJGarcia@armyspy.com",
                    hashedPassword:
                        "$2a$10$TCsMTRaBL7jRbUAT/Uyg5uUr3lZfl7afFTc0q.gzmTLq44BOXvcZu",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    firstName: "Eliane",
                    lastName: "Koelpin",
                    userName: "Ultralord",
                    email: "papoto9356@shopxda.com",
                    hashedPassword:
                        "$2a$10$TCsMTRaBL7jRbUAT/Uyg5uUr3lZfl7afFTc0q.gzmTLq44BOXvcZu",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    firstName: "Fernando",
                    lastName: "Vega",
                    userName: "FernandoasaurusRex",
                    email: "fvega@ezmail.com",
                    hashedPassword:
                        "$2a$10$TCsMTRaBL7jRbUAT/Uyg5uUr3lZfl7afFTc0q.gzmTLq44BOXvcZu",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    firstName: "Daan",
                    lastName: " Nijveld",
                    userName: "Hellstone",
                    email: "hellstone@hell.com",
                    hashedPassword:
                        "$2a$10$TCsMTRaBL7jRbUAT/Uyg5uUr3lZfl7afFTc0q.gzmTLq44BOXvcZu",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    firstName: "Martin",
                    lastName: "Beauchamp",
                    userName: "Dragonview",
                    email: "dragon22@mail.com",
                    hashedPassword:
                        "$2a$10$TCsMTRaBL7jRbUAT/Uyg5uUr3lZfl7afFTc0q.gzmTLq44BOXvcZu",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    firstName: "Ruben",
                    lastName: "Laverty",
                    userName: "Volleyballace",
                    email: "vball44@aoi.com",
                    hashedPassword:
                        "$2a$10$TCsMTRaBL7jRbUAT/Uyg5uUr3lZfl7afFTc0q.gzmTLq44BOXvcZu",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    firstName: "T'ae",
                    lastName: "Young-Jin",
                    userName: "Gamephase",
                    email: "fvega@deezmail.com",
                    hashedPassword:
                        "$2a$10$TCsMTRaBL7jRbUAT/Uyg5uUr3lZfl7afFTc0q.gzmTLq44BOXvcZu",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    firstName: "Theo",
                    lastName: "Evans",
                    userName: "Abyssmist",
                    email: "smist@io.com",
                    hashedPassword:
                        "$2a$10$TCsMTRaBL7jRbUAT/Uyg5uUr3lZfl7afFTc0q.gzmTLq44BOXvcZu",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    firstName: "Damarion",
                    lastName: " Welch",
                    userName: "Biofire",
                    email: "biofire@gmail.com",
                    hashedPassword:
                        "$2a$10$TCsMTRaBL7jRbUAT/Uyg5uUr3lZfl7afFTc0q.gzmTLq44BOXvcZu",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    firstName: "Akagawa",
                    lastName: "Kotaro",
                    userName: "Mortalrealm",
                    email: "mortal@jp.net",
                    hashedPassword:
                        "$2a$10$TCsMTRaBL7jRbUAT/Uyg5uUr3lZfl7afFTc0q.gzmTLq44BOXvcZu",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    firstName: "Jamie",
                    lastName: "Rivas",
                    userName: "Embercraze",
                    email: "embercraze@games.com",
                    hashedPassword:
                        "$2a$10$TCsMTRaBL7jRbUAT/Uyg5uUr3lZfl7afFTc0q.gzmTLq44BOXvcZu",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    firstName: "Tara",
                    lastName: "Reeves",
                    userName: "Bioscape",
                    email: "taraR@ms.com",
                    hashedPassword:
                        "$2a$10$TCsMTRaBL7jRbUAT/Uyg5uUr3lZfl7afFTc0q.gzmTLq44BOXvcZu",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    firstName: "Reyna",
                    lastName: "Bailey",
                    userName: "Fusioncell",
                    email: "Reyna@valorant.com",
                    hashedPassword:
                        "$2a$10$TCsMTRaBL7jRbUAT/Uyg5uUr3lZfl7afFTc0q.gzmTLq44BOXvcZu",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    firstName: "Roger",
                    lastName: "Camps",
                    userName: "Catalan",
                    email: "ccamps@catalan.com",
                    hashedPassword:
                        "$2a$10$TCsMTRaBL7jRbUAT/Uyg5uUr3lZfl7afFTc0q.gzmTLq44BOXvcZu",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Users", null, {});
    },
};
