import { describe, test, expect } from "vitest";
import { signInSchema, signUpSchema } from "./authSchema";

describe("Auth Schema", () => {
  test("pass khi input hợp lệ", () => {
    const result = signInSchema.safeParse({
      username: "username",
      password: "password123",
    });
    expect(result.success).toBe(true);
  });
  test("pass khi input không hợp lệ", () => {
    const result = signInSchema.safeParse({
      username: "",
      password: "",
    });
    expect(result.success).toBe(false);
  });

  test("pass khi input không hợp lệ password", () => {
    const result = signInSchema.safeParse({
      username: "username",
      password: "123",
    });
    expect(result.success).toBe(false);
  });

  test("pass khi input không hợp lệ username", () => {
    const result = signInSchema.safeParse({
      username: "1234",
      password: "123",
    });
    expect(result.success).toBe(false);
  });

  test("pass khi input hợp lệ sign up", () => {
    const result = signUpSchema.safeParse({
      username: "username",
      firstName: "First",
      lastName: "Last",
      email: "email@example.com",
      password: "password123",
      confirmPassword: "password123",
    });
    expect(result.success).toBe(true);
  });

  test("pass khi input không hợp lệ username", () => {
    const result = signUpSchema.safeParse({
      username: "",
      firstName: "First",
      lastName: "Last",
      email: "email@example.com",
      password: "password123",
      confirmPassword: "password123",
    });
    expect(result.success).toBe(false);
  });

  test("pass khi input không hợp lệ firstName", () => {
    const result = signUpSchema.safeParse({
      username: "username",
      firstName: "",
      lastName: "Last",
      email: "email@example.com",
      password: "password123",
      confirmPassword: "password123",
    });
    expect(result.success).toBe(false);
  });

  test("pass khi input không hợp lệ lastName", () => {
    const result = signUpSchema.safeParse({
      username: "username",
      firstName: "First",
      lastName: "",
      email: "email@example.com",
      password: "password123",
      confirmPassword: "password123",
    });
    expect(result.success).toBe(false);
  });
  test("pass khi input không hợp lệ email", () => {
    const result = signUpSchema.safeParse({
      username: "username",
      firstName: "First",
      lastName: "Last",
      email: "",
      password: "password123",
      confirmPassword: "password123",
    });
    expect(result.success).toBe(false);
  });
  test("pass khi input không hợp lệ password", () => {
    const result = signUpSchema.safeParse({
      username: "username",
      firstName: "First",
      lastName: "Last",
      email: "email@example.com",
      password: "",
      confirmPassword: "",
    });
    expect(result.success).toBe(false);
  });
  test("pass khi input không hợp lệ confirmPassword", () => {
    const result = signUpSchema.safeParse({
      username: "username",
      firstName: "First",
      lastName: "Last",
      email: "email@example.com",
      password: "password123",
      confirmPassword: "differentPassword",
    });
    expect(result.success).toBe(false);
  });
});
