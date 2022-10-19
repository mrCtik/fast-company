import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { validator } from "../../../utils/validator";
// import api from "../../../API";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import BackHistoryButton from "../../common/backButton";
import { useAuth } from "../../../hooks/useAuth";
import { useProfessions } from "../../../hooks/useProfession";
import { useQualities } from "../../../hooks/useQualities";
import { useUser } from "../../../hooks/useUsers";

const EditUserPage = () => {
    const { userId } = useParams();
    const history = useHistory();
    const { updateUser, currentUser } = useAuth();
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const { isLoading: professionsLoading, professions: professionsHook } =
        useProfessions();
    const [professions, setProfessions] = useState([]);

    const [qualities, setQualities] = useState([]);
    const { isLoading: qualitiesLoading, qualities: qualitiesHook } =
        useQualities();

    const [errors, setErrors] = useState({});
    const { isLoading: usersLoading, getUserById } = useUser();
    const [data, setData] = useState({
        name: "",
        email: "",
        profession: "",
        sex: "male",
        qualities: []
    });

    useEffect(() => {
        if (!usersLoading) {
            const user = getUserById(userId);
            setUser(user);
        }
    }, [usersLoading, userId]);

    useEffect(() => {
        if (!professionsLoading) {
            const professions = getProfessionsList(professionsHook);
            setProfessions(professions);
        }
        if (!qualitiesLoading) {
            const qualities = getQualitiesList(qualitiesHook);
            setQualities(qualities);
        }
    }, [professionsLoading, qualitiesLoading]);

    useEffect(() => {
        if (Object.keys(user).length && qualities.length) {
            const { name, email, profession, sex, qualities } = user;
            setData({
                name,
                email,
                profession,
                sex,
                qualities: getQualitiesList(qualities)
            });
        }
    }, [user, qualities]);

    useEffect(() => {
        if (professions.length && qualities.length && data.name && isLoading) {
            setIsLoading(false);
        }
    }, [professions, qualities, data]);

    const getProfessionsList = (profession) => {
        return Object.keys(profession).map((prof) => ({
            label: profession[prof].name,
            value: profession[prof]._id
        }));
    };

    const getQualitiesList = (quality) => {
        let qualitiesArray = [];
        let key = 0;

        if (Object.keys(quality).some((keys) => quality[keys].value)) {
            key = 2;
        } else if (quality.some((keys) => typeof keys !== "object")) {
            key = 1;
        } else {
            key = 0;
        }
        switch (key) {
            case 0: {
                qualitiesArray = Object.keys(quality).map((qual) => ({
                    label: quality[qual].name,
                    value: quality[qual]._id,
                    color: quality[qual].color
                }));
                break;
            }
            case 1: {
                qualitiesArray = quality.map((id) =>
                    qualities.find((qual) => qual.value === id)
                );
                break;
            }
            case 2: {
                qualitiesArray = quality.map((qual) => qual.value);
                break;
            }
            default:
                break;
        }

        return qualitiesArray;
    };

    if (currentUser._id !== userId) {
        history.push(`/users/${currentUser._id}/edit`);
    }

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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isValid) return;
        const { qualities } = data;
        const newUserData = {
            ...user,
            ...data,
            qualities: getQualitiesList(qualities)
        };
        updateUser(newUserData);
        history.push(`/users/${userId}`);
    };

    return !isLoading ? (
        <div className="container mt-5">
            <BackHistoryButton />
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
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
                </div>
            </div>
        </div>
    ) : (
        "Loading..."
    );
};

export default EditUserPage;
