import { describe, it, expect, beforeEach, vi } from "vitest";
import { UiIcon } from "./ui-icon.js";

// Ensure the component is registered
customElements.get("ui-icon") || customElements.define("ui-icon", UiIcon);

describe("UiIcon", () => {
  let icon: UiIcon;

  beforeEach(() => {
    icon = new UiIcon();
    document.body.appendChild(icon);
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  describe("Initialization", () => {
    it("should create an instance", () => {
      expect(icon).toBeInstanceOf(UiIcon);
      expect(icon).toBeInstanceOf(HTMLElement);
    });

    it("should have default values", () => {
      expect(icon.name).toBe("");
      expect(icon.size).toBe("md");
      expect(icon.color).toBe("");
      expect(icon.strokeWidth).toBe("");
      expect(icon.fill).toBe("");
      expect(icon.clickable).toBe(false);
      expect(icon.label).toBe("");
    });

    it("should have shadow root", () => {
      expect(icon.shadowRoot).toBeTruthy();
    });
  });

  describe("Properties and Attributes", () => {
    describe("name", () => {
      it("should set and get name property", () => {
        icon.name = "check";
        expect(icon.name).toBe("check");
        expect(icon.getAttribute("name")).toBe("check");
      });

      it("should update name via attribute", () => {
        icon.setAttribute("name", "x");
        expect(icon.name).toBe("x");
      });
    });

    describe("size", () => {
      const validSizes = ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl"];

      validSizes.forEach((size) => {
        it(`should accept valid size: ${size}`, () => {
          icon.size = size as any;
          expect(icon.size).toBe(size);
          expect(icon.getAttribute("size")).toBe(size);
        });
      });

      it("should ignore invalid size", () => {
        icon.size = "invalid" as any;
        expect(icon.size).toBe("md"); // Should remain default
      });

      it("should update size via attribute", () => {
        icon.setAttribute("size", "lg");
        expect(icon.size).toBe("lg");
      });
    });

    describe("color", () => {
      it("should set and get color property", () => {
        icon.color = "red";
        expect(icon.color).toBe("red");
        expect(icon.getAttribute("color")).toBe("red");
      });

      it("should update color via attribute", () => {
        icon.setAttribute("color", "blue");
        expect(icon.color).toBe("blue");
      });
    });

    describe("strokeWidth", () => {
      it("should set and get strokeWidth property", () => {
        icon.strokeWidth = "3";
        expect(icon.strokeWidth).toBe("3");
        expect(icon.getAttribute("stroke-width")).toBe("3");
      });

      it("should update strokeWidth via attribute", () => {
        icon.setAttribute("stroke-width", "1");
        expect(icon.strokeWidth).toBe("1");
      });
    });

    describe("fill", () => {
      it("should set and get fill property", () => {
        icon.fill = "currentColor";
        expect(icon.fill).toBe("currentColor");
        expect(icon.getAttribute("fill")).toBe("currentColor");
      });

      it("should update fill via attribute", () => {
        icon.setAttribute("fill", "none");
        expect(icon.fill).toBe("none");
      });
    });

    describe("clickable", () => {
      it("should set and get clickable property", () => {
        icon.clickable = true;
        expect(icon.clickable).toBe(true);
        expect(icon.hasAttribute("clickable")).toBe(true);
      });

      it("should update clickable via attribute", () => {
        icon.setAttribute("clickable", "");
        expect(icon.clickable).toBe(true);
      });

      it("should handle boolean conversion", () => {
        icon.clickable = "true" as any;
        expect(icon.clickable).toBe(true);
      });
    });

    describe("label", () => {
      it("should set and get label property", () => {
        icon.label = "Close button";
        expect(icon.label).toBe("Close button");
        expect(icon.getAttribute("label")).toBe("Close button");
      });

      it("should update label via attribute", () => {
        icon.setAttribute("label", "Menu");
        expect(icon.label).toBe("Menu");
      });
    });
  });

  describe("Rendering", () => {
    it("should render with default icon when name is empty", () => {
      icon.name = "";
      const svgElement = icon.shadowRoot?.querySelector("svg");
      expect(svgElement).toBeTruthy();
    });

    it("should render correct icon based on name", () => {
      icon.name = "check";
      const svgElement = icon.shadowRoot?.querySelector("svg");
      expect(svgElement).toBeTruthy();
      expect(svgElement?.innerHTML).toContain("polyline");
    });

    it("should apply size class", () => {
      icon.size = "lg";
      const iconElement = icon.shadowRoot?.querySelector(".ui-icon");
      expect(iconElement?.classList.contains("ui-icon--lg")).toBe(true);
    });

    it("should apply clickable class when clickable", () => {
      icon.clickable = true;
      const iconElement = icon.shadowRoot?.querySelector(".ui-icon");
      expect(iconElement?.classList.contains("ui-icon--clickable")).toBe(true);
    });

    it("should apply color style when color is set", () => {
      icon.color = "red";
      const iconElement = icon.shadowRoot?.querySelector(".ui-icon");
      expect(iconElement?.getAttribute("style")).toContain("color: red");
    });

    it("should apply tabindex when clickable", () => {
      icon.clickable = true;
      const iconElement = icon.shadowRoot?.querySelector(".ui-icon");
      expect(iconElement?.getAttribute("tabindex")).toBe("0");
    });

    it("should apply role when clickable", () => {
      icon.clickable = true;
      const iconElement = icon.shadowRoot?.querySelector(".ui-icon");
      expect(iconElement?.getAttribute("role")).toBe("button");
    });

    it("should apply aria-label when label is set", () => {
      icon.label = "Close";
      const iconElement = icon.shadowRoot?.querySelector(".ui-icon");
      expect(iconElement?.getAttribute("aria-label")).toBe("Close");
    });

    it("should apply custom stroke-width to SVG", () => {
      icon.name = "check"; // Need a name to generate SVG
      icon.strokeWidth = "3";
      const svgElement = icon.shadowRoot?.querySelector("svg");
      expect(svgElement?.getAttribute("stroke-width")).toBe("3");
    });

    it("should apply custom fill to SVG", () => {
      icon.name = "check"; // Need a name to generate SVG
      icon.fill = "currentColor";
      const svgElement = icon.shadowRoot?.querySelector("svg");
      expect(svgElement?.getAttribute("fill")).toBe("currentColor");
    });
  });

  describe("Events", () => {
    it("should dispatch ui-icon-click event when clicked and clickable", () => {
      const handler = vi.fn();
      icon.addEventListener("ui-icon-click", handler);
      icon.clickable = true;
      icon.name = "check";

      const iconElement = icon.shadowRoot?.querySelector(".ui-icon");
      iconElement?.dispatchEvent(new MouseEvent("click"));

      expect(handler).toHaveBeenCalledTimes(1);
      expect(handler).toHaveBeenCalledWith(
        expect.objectContaining({
          detail: expect.objectContaining({
            name: "check",
            size: "md",
            originalEvent: expect.any(MouseEvent),
          }),
        })
      );
    });

    it("should not dispatch event when not clickable", () => {
      const handler = vi.fn();
      icon.addEventListener("ui-icon-click", handler);
      icon.clickable = false;

      const iconElement = icon.shadowRoot?.querySelector(".ui-icon");
      iconElement?.dispatchEvent(new MouseEvent("click"));

      expect(handler).not.toHaveBeenCalled();
    });

    it("should handle keyboard events (Enter)", () => {
      const handler = vi.fn();
      icon.addEventListener("ui-icon-click", handler);
      icon.clickable = true;

      const iconElement = icon.shadowRoot?.querySelector(".ui-icon");
      iconElement?.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));

      expect(handler).toHaveBeenCalledTimes(1);
    });

    it("should handle keyboard events (Space)", () => {
      const handler = vi.fn();
      icon.addEventListener("ui-icon-click", handler);
      icon.clickable = true;

      const iconElement = icon.shadowRoot?.querySelector(".ui-icon");
      iconElement?.dispatchEvent(new KeyboardEvent("keydown", { key: " " }));

      expect(handler).toHaveBeenCalledTimes(1);
    });

    it("should not handle other keyboard events", () => {
      const handler = vi.fn();
      icon.addEventListener("ui-icon-click", handler);
      icon.clickable = true;

      const iconElement = icon.shadowRoot?.querySelector(".ui-icon");
      iconElement?.dispatchEvent(new KeyboardEvent("keydown", { key: "a" }));

      expect(handler).not.toHaveBeenCalled();
    });
  });

  describe("Methods", () => {
    describe("focus", () => {
      it("should focus when clickable", () => {
        icon.clickable = true;
        const focusSpy = vi.spyOn(icon, "focusFirstElementInShadow");
        icon.focus();
        expect(focusSpy).toHaveBeenCalledTimes(1);
      });

      it("should not focus when not clickable", () => {
        icon.clickable = false;
        const focusSpy = vi.spyOn(icon, "focusFirstElementInShadow");
        icon.focus();
        expect(focusSpy).not.toHaveBeenCalled();
      });
    });

    describe("click", () => {
      it("should trigger click event when clickable", () => {
        const handler = vi.fn();
        icon.addEventListener("ui-icon-click", handler);
        icon.clickable = true;
        icon.click();
        expect(handler).toHaveBeenCalledTimes(1);
      });

      it("should not trigger click event when not clickable", () => {
        const handler = vi.fn();
        icon.addEventListener("ui-icon-click", handler);
        icon.clickable = false;
        icon.click();
        expect(handler).not.toHaveBeenCalled();
      });
    });
  });

  describe("Icon Library", () => {
    it("should have predefined icons", () => {
      // Test a few key icons
      const testIcons = ["check", "x", "menu", "search", "home", "user"];
      
      testIcons.forEach((iconName) => {
        icon.name = iconName;
        const svgElement = icon.shadowRoot?.querySelector("svg");
        expect(svgElement).toBeTruthy();
        expect(svgElement?.innerHTML.trim()).not.toBe("");
      });
    });

    it("should fall back to default icon for unknown names", () => {
      icon.name = "unknown-icon";
      const svgElement = icon.shadowRoot?.querySelector("svg");
      expect(svgElement).toBeTruthy();
      expect(svgElement?.innerHTML).toContain("rect");
    });
  });

  describe("Accessibility", () => {
    it("should have proper ARIA attributes when clickable", () => {
      icon.clickable = true;
      icon.label = "Close dialog";
      
      const iconElement = icon.shadowRoot?.querySelector(".ui-icon");
      expect(iconElement?.getAttribute("role")).toBe("button");
      expect(iconElement?.getAttribute("aria-label")).toBe("Close dialog");
      expect(iconElement?.getAttribute("tabindex")).toBe("0");
    });

    it("should not have interactive ARIA attributes when not clickable", () => {
      icon.clickable = false;
      icon.label = "Decorative icon";
      
      const iconElement = icon.shadowRoot?.querySelector(".ui-icon");
      expect(iconElement?.getAttribute("role")).toBeNull();
      expect(iconElement?.getAttribute("tabindex")).toBeNull();
    });
  });

  describe("Attribute Changes", () => {
    it("should re-render when attributes change", () => {
      const renderSpy = vi.spyOn(icon, "render");
      icon.setAttribute("name", "check");
      expect(renderSpy).toHaveBeenCalled();
    });

    it("should handle multiple attribute changes", () => {
      icon.setAttribute("name", "check");
      icon.setAttribute("size", "lg");
      icon.setAttribute("color", "red");
      icon.setAttribute("clickable", "");
      
      expect(icon.name).toBe("check");
      expect(icon.size).toBe("lg");
      expect(icon.color).toBe("red");
      expect(icon.clickable).toBe(true);
    });
  });

  describe("CSS Classes", () => {
    it("should have base class", () => {
      const iconElement = icon.shadowRoot?.querySelector(".ui-icon");
      expect(iconElement?.classList.contains("ui-icon")).toBe(true);
    });

    it("should have size-specific class", () => {
      icon.size = "xl";
      const iconElement = icon.shadowRoot?.querySelector(".ui-icon");
      expect(iconElement?.classList.contains("ui-icon--xl")).toBe(true);
    });

    it("should conditionally have clickable class", () => {
      icon.clickable = false;
      let iconElement = icon.shadowRoot?.querySelector(".ui-icon");
      expect(iconElement?.classList.contains("ui-icon--clickable")).toBe(false);

      icon.clickable = true;
      iconElement = icon.shadowRoot?.querySelector(".ui-icon");
      expect(iconElement?.classList.contains("ui-icon--clickable")).toBe(true);
    });
  });
});