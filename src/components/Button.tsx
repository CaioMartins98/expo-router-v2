import {
  View,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import React from "react";
import { forwardRef } from "react";
type Props = TouchableOpacityProps & {
  title: string;
  disable: boolean;
};

const Button = forwardRef<TouchableOpacity, Props>(
  ({ title, disable, ...rest }, ref) => {
    return (
      <TouchableOpacity
        ref={ref}
        style={{
          width: 200,
          padding: 16,
          alignItems: "center",
          backgroundColor: disable ? "#aaa8f5" : "#5755ee",
          borderRadius: 8,
          marginTop: 20,
        }}
        disabled={disable}
        {...rest}
      >
        <Text
          style={{
            color: "#fff",
            fontWeight: "700",
          }}
        >
          {title}
        </Text>
      </TouchableOpacity>
    );
  }
);

export default Button;
