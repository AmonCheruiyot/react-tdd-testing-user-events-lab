import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/react';
import App from "../App";

describe("App", () => {
  test("displays a top-level heading with the text `Hi, I'm _______`", () => {
    render(<App />);

    const topLevelHeading = screen.getByRole("heading", {
      name: /hi, i'm/i,
      level: 1,
    });

    expect(topLevelHeading).toBeInTheDocument();
  });

  test("displays an image of yourself", () => {
    render(<App />);

    const image = screen.getByAltText("My profile pic");

    expect(image).toHaveAttribute("src", "https://via.placeholder.com/350");
  });

  test("displays second-level heading with the text `About Me`", () => {
    render(<App />);

    const secondLevelHeading = screen.getByRole("heading", {
      name: /about me/i,
      level: 2,
    });

    expect(secondLevelHeading).toBeInTheDocument();
  });

  test("displays a paragraph for your biography", () => {
    render(<App />);

    const bio = screen.getByText(/lorem ipsum/i);

    expect(bio).toBeInTheDocument();
  });

  test("displays the correct links", () => {
    render(<App />);

    const githubLink = screen.getByRole("link", {
      name: /github/i,
    });
    const linkedinLink = screen.getByRole("link", {
      name: /linkedin/i,
    });

    expect(githubLink).toHaveAttribute(
      "href",
      expect.stringContaining("https://github.com")
    );

    expect(linkedinLink).toHaveAttribute(
      "href",
      expect.stringContaining("https://linkedin.com")
    );
  });

  test("the form includes text inputs for name and email address", () => {
    render(<App />);

    const nameInput = screen.getByRole("textbox", {
      name: /name/i,
    });
    const emailInput = screen.getByRole("textbox", {
      name: /email/i,
    });

    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
  });

  test("the form includes three checkboxes to select areas of interest", () => {
    render(<App />);

    const checkboxes = screen.getAllByRole("checkbox");

    expect(checkboxes.length).toBe(3);
  });

  test("the checkboxes are initially unchecked", () => {
    render(<App />);

    const checkboxes = screen.getAllByRole("checkbox");

    checkboxes.forEach((checkbox) => {
      expect(checkbox).not.toBeChecked();
    });
  });

  test("the page shows information the user types into the name and email address form fields", () => {
    render(<App />);

    const nameInput = screen.getByRole("textbox", {
      name: /name/i,
    });
    const emailInput = screen.getByRole("textbox", {
      name: /email/i,
    });

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "john.doe@example.com" } });

    expect(nameInput).toHaveValue("John Doe");
    expect(emailInput).toHaveValue("john.doe@example.com");
  });

  test("checked status of checkboxes changes when user clicks them", () => {
    render(<App />);

    const checkbox1 = screen.getByRole("checkbox", {
      name: /react/i,
    });
    const checkbox2 = screen.getByRole("checkbox", {
      name: /javascript/i,
    });

    fireEvent.click(checkbox1);
    fireEvent.click(checkbox2);

    expect(checkbox1).toBeChecked();
    expect(checkbox2).toBeChecked();
  });

  test("a message is displayed when the user clicks the Submit button", () => {
    render(<App />);

    const submitButton = screen.getByRole("button", {
      name: /submit/i,
    });
    fireEvent.click(submitButton);

    const message = screen.getByText(/form submitted successfully/i);

    expect(message).toBeInTheDocument();
  });
});