import React from "react";

import Nav from "./StackNavigator";
import AuthStack from "./AuthStack";
import { useAuth } from "../firebase/useAuth";

export default function BaseNav() {
  const { user } = useAuth();
  console.log(user + "user log");

  return user ? <Nav /> : <AuthStack />;
}
