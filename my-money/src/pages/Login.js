import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { usePost } from "../utils/rest";

//Alterar pela key que tenho salvado no notepad
const urlKeyApi = "";

const Login = () => {
  const [dataSignin, signin] = usePost(urlKeyApi);
  const [logado, setLogado] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmail = (evt) => {
    setEmail(evt.target.value);
  };

  const onChangePassword = (evt) => {
    setPassword(evt.target.value);
  };

  useEffect(() => {
    if (Object.keys(dataSignin.payload).length > 0) {
      localStorage.setItem("token", dataSignin.payload.idToken);
      window.location.reload();
    }
  }, [dataSignin]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLogado(true);
    } else {
      setLogado(false);
    }
  });

  const login = async () => {
    await signin({
      email,
      password,
      returnSecureToken: true,
    });
  };

  if (logado) {
    return <Redirect to="/" />;
  }
  return (
    <div className="container">
      <h1>Login</h1>
      <input
        type="text"
        value={email}
        onChange={onChangeEmail}
        placeholder="Seu e-mail"
      ></input>
      <input
        type="password"
        value={password}
        onChange={onChangePassword}
        placeholder="Sua senha"
      ></input>
      <button onClick={login}>Login</button>
      {dataSignin.error && <pre>Usuário ou Senha inválidos</pre>}
    </div>
  );
};

export default Login;
