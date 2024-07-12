import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Page from "../src/app/page";
import QuoteGenerator from "../components/QuoteGenerator";

describe("Page", () => {
    it("renders a heading", () => {
        render(<Page />);
        
        const heading = screen.getByRole("heading", { level: 1 });
        expect(heading).toBeInTheDocument();
    });
});

describe("QuoteGenerator", () => {
    test("renders without crashing", () => {
        render(<QuoteGenerator />);
        expect(screen.getByText("Generate a Quote")).toBeInTheDocument();
        expect(screen.getByText("Save Quote")).toBeInTheDocument();
    });
    
    test("fetches and displays a quote", async () => {
        const fakeQuote = { text: "Test Quote", author: "Test Author"};
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve(fakeQuote),
            })
            );

            render(<QuoteGenerator />);
            fireEvent.click(screen.getByText("Generate a Quote"));

            const quoteText = await screen.findByText(fakeQuote.text);
            const quoteAuthor = screen.getByText(`${fakeQuote.author}`);

            expect(quoteText).toBeInTheDocument();
            expect(quoteAuthor).toBeInTheDocument();
        });

        test("saves a quote", async () => {
            const fakeQuote = { text: "test Quote", author: "Test Author"};
            global.fetch = jest.fn(() =>
                Promise.resolve({
                    json: () => Promise.resolve(fakeQuote),
                })
            );

            render(<QuoteGenerator />);
            fireEvent.click(screen.getByText("Generate a Quote"));

            await screen.findByText(fakeQuote.text);
            fireEvent.click(screen.getByText("Save Quote"));
            const savedQuote = screen.getByText(
                `"${fakeQuote.text}" - ${fakeQuote.author}`
            );
            expect(savedQuote).toBeInTheDocument();
        });

        test("initially renders with no quotes", () => {
            render(<QuoteGenerator />);
            const savedQuotesList = screen.getByRole("list");
            expect(savedQuotesList.children.length).toBe(0);
        });
        
        test("displays saved quotes", () => {
            render(<QuoteGenerator />);
            const savedQuotesList = screen.getByRole("list");
            expect(savedQuotesList.children.length).toBe(0);
        });

        test("displays saved quotes", () => {
            render(<QuoteGenerator />);
            fireEvent.click(screen.getByText("Generate Quote"));
            fireEvent.click(screen.getByText("Save Quote"));

            const savedQuoteHeading = screen.getByText("Saved Quotes");
            expect(savedQuoteHeading).toBeInTheDocument();
        });
    });



