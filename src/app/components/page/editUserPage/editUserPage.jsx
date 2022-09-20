import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { validator } from "../../../utils/validator";
import api from "../../../api";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import BackHistoryButton from "../../common/backButton";

const EditUserPage = () => {
    const { userId } = useParams();
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState({
        name: "",
        email: "",
        profession: "",
        sex: "male",
        qualities: []
    });
    const [professions, setProfession] = useState([]);
    const [qualities, setQualities] = useState([]);
    const [errors, setErrors] = useState({});
    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof.value === id) {
                return { _id: prof.value, name: prof.label };
            }
        }
    };
    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem.value === qualities[quality].value) {
                    qualitiesArray.push({
                        _id: qualities[quality].value,
                        name: qualities[quality].label,
                        color: qualities[quality].color
                    });
                }
            }
        }
        return qualitiesArray;
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const { profession, qualities } = data;
        api.users
            .update(userId, {
                ...data,
                profession: getProfessionById(profession),
                qualities: getQualities(qualities)
            })
            .then((data) => history.push(`/users/${data._id}`));
        console.log({
            ...data,
            profession: getProfessionById(profession),
            qualities: getQualities(qualities)
        });
    };
    const transformData = (data) => {
        return data.map((qual) => ({ label: qual.name, value: qual._id }));
    };
    useEffect(() => {
        setIsLoading(true);
        api.users.getById(userId).then(({ profession, qualities, ...data }) =>
            setData((prevState) => ({
                ...prevState,
                ...data,
                qualities: transformData(qualities),
                profession: profession._id
            }))
        );
        api.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfession(professionsList);
        });
        api.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                value: data[optionName]._id,
                label: data[optionName].name,
                color: data[optionName].color
            }));
            setQualities(qualitiesList);
        });
    }, []);
    useEffect(() => {
        if (data._id) setIsLoading(false);
    }, [data]);

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        name: {
            isRequired: {
                message: "Введите ваше имя"
            }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;
    return (
        <div className="container mt-5">
            {!isLoading
? (<BackHistoryButton />)
: (
                        ""
                    )}
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {!isLoading && Object.keys(professions).length > 0
? (
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Имя"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                error={errors.name}
                            />
                            <TextField
                                label="Электронная почта"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                error={errors.email}
                            />
                            <SelectField
                                label="Выбери свою профессию"
                                defaultOption="Choose..."
                                options={professions}
                                name="profession"
                                onChange={handleChange}
                                value={data.profession}
                                error={errors.profession}
                                />

                            <RadioField
                                options={[
                                    { name: "Male", value: "male" },
                                    { name: "Female", value: "female" },
                                    { name: "Other", value: "other" }
                                ]}
                                value={data.sex}
                                name="sex"
                                onChange={handleChange}
                                label="Выберите ваш пол"
                            />
                            <MultiSelectField
                                defaultValue={data.qualities}
                                options={qualities}
                                onChange={handleChange}
                                name="qualities"
                                label="Выберите ваши качества"
                            />
                            <button
                                type="submit"
                                disabled={!isValid}
                                className="btn btn-primary w-100 mx-auto"
                            >
                                Обновить
                            </button>
                        </form>
                    )
: (
                        "Loading..."
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditUserPage;

// import React, { useEffect, useState } from "react";
// import { validator } from "../../../utils/validator";
// import TextField from "../../common/form/textField";
// import api from "../../../api";
// import SelectField from "../../common/form/selectField";
// import RadioField from "../../common/form/radioField";
// import MultiSelectField from "../../common/form/multiSelectField";
// import PropTypes from "prop-types";
// import { useHistory, useParams } from "react-router-dom";
// import BackHistoryButton from "../../common/backButton";

// const EditUserPage = () => {
//     const { userId } = useParams();
//     const [isLoading, setIsLoading] = useState(false);
//     const [data, setData] = useState({
//         email: "",
//         password: "",
//         profession: "",
//         sex: "male",
//         qualities: []
//     });

//     const [qualities, setQualities] = useState({});
//     const [professions, setProfession] = useState([]);
//     const [errors, setErrors] = useState({});
//     const history = useHistory();

//     const getProfessionById = (id) => {
//         for (const prof of professions) {
//             if (prof.value === id) {
//                 return { _id: prof.value, name: prof.label };
//             }
//         }
//     };

//     const getQualities = (elements, key) => {
//         let qualitiesArray = [];
//         switch (key) {
//             case "api": {
//                 qualitiesArray = Object.keys(elements).map((optionName) => ({
//                     label: elements[optionName].name,
//                     value: elements[optionName]._id,
//                     color: elements[optionName].color
//                 }));
//                 break;
//             }
//             case "local": {
//                 qualitiesArray = Object.keys(elements).map((optionName) => ({
//                     name: elements[optionName].label,
//                     _id: elements[optionName].value,
//                     color: elements[optionName].color
//                 }));
//                 break;
//             }
//             default:
//                 break;
//         }
//         return qualitiesArray;
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const isValid = validate();
//         if (!isValid) return;
//         const { profession, qualities } = data;
//         const newUserData = {
//             ...data,
//             profession: getProfessionById(profession),
//             qualities: getQualities(qualities, "local")
//         };
//         api.users
//             .update(userId, newUserData)
//             .then(history.push(`/users/${data._id}`));
//     };

//     useEffect(() => {
//         setIsLoading(true);
//         api.users.getById(userId).then(({ profession, ...data }) =>
//             setData((prevState) => ({
//                 ...prevState,
//                 ...data,
//                 profession: profession._id
//             }))
//         );

//         api.professions.fetchAll().then((data) => setProfession(data));
//         api.qualities.fetchAll().then((data) => setQualities(data));
//     }, []);

//     // const isUserDataExist = Object.keys(user).length;

//     // useEffect(() => {
//     //     isUserDataExist &&
//     //         setData({
//     //             name: user.name,
//     //             email: user.email,
//     //             profession: user.profession._id,
//     //             sex: user.sex,
//     //             qualities: getQualities(user.qualities, "api")
//     //         });
//     // }, [user]);

//     // useEffect(() => {
//     //     isUserDataExist && validate();
//     // }, [data]);

//     useEffect(() => {
//         if (data._id) setIsLoading(false);
//     }, [data]);

//     const validatorConfig = {
//         name: {
//             isRequired: {
//                 massage: "Поле имя обязательно для заполнения"
//             }
//         },
//         email: {
//             isRequired: {
//                 massage: "Электронная почта обязательная для заполнения"
//             },
//             isEmail: {
//                 massage: "Неверный email"
//             }
//         },
//         profession: {
//             isRequired: {
//                 massage: "Обязательно выберите свою профессию"
//             }
//         }
//     };

//     useEffect(() => validate(), [data]);

//     const handleChange = (target) => {
//         setData((prevState) => ({
//             ...prevState,
//             [target.name]: target.value
//         }));
//     };

//     const validate = () => {
//         const errors = validator(data, validatorConfig);
//         setErrors(errors);
//         return Object.keys(errors).length === 0;
//     };

//     const isValid = Object.keys(errors).length === 0;

//     return (
//         <div className="container mt-5">
//             <BackHistoryButton />
//             <div className="row">
//                 <div className="col-md-6 offset-md-3 shadow p-4">
//                     {!isLoading && Object.keys(professions).length > 0
// ? (
//                         <form onSubmit={handleSubmit}>
//                             <TextField
//                                 label="Имя Фамилия"
//                                 name="name"
//                                 value={data.name}
//                                 onChange={handleChange}
//                                 error={errors.email}
//                             />
//                             <TextField
//                                 label="Электронная почта"
//                                 name="email"
//                                 value={data.email}
//                                 onChange={handleChange}
//                                 error={errors.email}
//                             />
//                             <SelectField
//                                 label="Выбери свою профессию"
//                                 defaultOption="Choose..."
//                                 options={professions}
//                                 name="profession"
//                                 onChange={handleChange}
//                                 value={data.profession}
//                                 error={errors.profession}
//                             />
//                             <RadioField
//                                 label="Выберите ваш пол"
//                                 name="sex"
//                                 onChange={handleChange}
//                                 value={data.sex}
//                                 options={[
//                                     { name: "Male", value: "male" },
//                                     { name: "Female", value: "female" },
//                                     { name: "Other", value: "other" }
//                                 ]}
//                             />
//                             <MultiSelectField
//                                 options={qualities}
//                                 onChange={handleChange}
//                                 defaultValue={data.qualities}
//                                 name="qualities"
//                                 label="Выберите ваши качества"
//                             />
//                             <button
//                                 className="btn btn-primary w-100 mx-auto"
//                                 type="submit"
//                                 disabled={!isValid}
//                             >
//                                 Сохранить
//                             </button>
//                         </form>
//                     )
// : (
//                         "Loading..."
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// EditUserPage.propTypes = {
//     id: PropTypes.string
// };

// export default EditUserPage;
