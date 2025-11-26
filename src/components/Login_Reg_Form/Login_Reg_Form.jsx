// components/Login_Reg_Form/Login_Reg_Form.jsx
import AuthForm from "../AuthForm/AuthForm";
import "./index.css";

const Login_Reg_Form = () => {
    return (
        <div
            className="Login_Reg_Form_main_div"
            style={{
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                justifyContent: "center",
            }}
        >
            <div
                className="Login_Reg_Form_content"
                style={{
                    width: "90%",
                    display: 'flex',
                    height: 'auto',
                    flexWrap: "wrap",
                }}
            >
                <h1
                    className="Login_Reg_Form_H1"
                    style={{
                        textTransform: 'uppercase',
                        fontWeight: '900',
                        height: "fit-content",
                    }}
                >
                    Для оформления подписки на тариф, необходимо авторизоваться.
                </h1>
                <AuthForm />
                <img
                    className="Login_Reg_Form_img"
                    src='/icons/PeopleWithKey.svg'
                    alt="PeopleWithKey"
                />
            </div>
        </div>
    );
};

export default Login_Reg_Form;
