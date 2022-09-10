import React, { useEffect, useState } from "react";
import { validator } from "../../../utils/validator";
import TextField from "../../common/form/textField";
import api from "../../../api";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

const EditUserPage = ({ id }) => {
    const [data, setData] = useState({
        email: "",
        password: "",
        profession: "",
        sex: "male",
        qualities: []
    });

    const [user, setUser] = useState({});
    const [qualities, setQualities] = useState([]);
    const [professions, setProfession] = useState([]);
    const [errors, setErrors] = useState({});
    const history = useHistory();

    useEffect(() => {
        api.users.getById(id).then((data) => {
            setUser(data);
        });
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

    const isUserDataExist = Object.keys(user).length;

    useEffect(() => {
        isUserDataExist &&
            setData({
                name: user.name,
                email: user.email,
                profession: user.profession._id,
                sex: user.sex,
                qualities: getQualities(user.qualities, "api")
            });
    }, [user]);

    useEffect(() => {
        isUserDataExist && validate();
    }, [data]);

    const validatorConfig = {
        name: {
            isRequired: {
                massage: "Поле имя обязательно для заполнения"
            }
        },
        email: {
            isRequired: {
                massage: "Электронная почта обязательная для заполнения"
            },
            isEmail: {
                massage: "Неверный email"
            }
        },
        profession: {
            isRequired: {
                massage: "Обязательно выберите свою профессию"
            }
        }
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof.value === id) {
                return { _id: prof.value, name: prof.label };
            }
        }
    };

    const getQualities = (elements, key) => {
        let qualitiesArray = [];
        switch (key) {
        case "api": {
            qualitiesArray = Object.keys(elements).map((optionName) => ({
                label: elements[optionName].name,
                value: elements[optionName]._id,
                color: elements[optionName].color
            }));
            break;
        }
        case "local": {
            qualitiesArray = Object.keys(elements).map((optionName) => ({
                name: elements[optionName].label,
                _id: elements[optionName].value,
                color: elements[optionName].color
            }));
            break;
        }
        default:
            break;
        }
        return qualitiesArray;
    };

    const isValid = Object.keys(errors).length === 0;

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const { profession, qualities } = data;
        const newUserData = {
            ...data,
            profession: getProfessionById(profession),
            qualities: getQualities(qualities, "local")
        };
        api.users.update(id, newUserData).then(history.push(`/users/${id}`));
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Имя Фамилия"
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                            error={errors.email}
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
                            label="Выберите ваш пол"
                            name="sex"
                            onChange={handleChange}
                            value={data.sex}
                            options={[
                                { name: "Male", value: "male" },
                                { name: "Female", value: "female" },
                                { name: "Other", value: "other" }
                            ]}
                        />
                        <MultiSelectField
                            options={qualities}
                            onChange={handleChange}
                            defaultValue={data.qualities}
                            name="qualities"
                            label="Выберите ваши качества"
                        />
                        <button
                            className="btn btn-primary w-100 mx-auto"
                            type="submit"
                            disabled={!isValid}
                        >
                            Сохранить
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

EditUserPage.propTypes = {
    id: PropTypes.string
};

export default EditUserPage;
