describe("create", function() {
    "use strict";

    it("should create single DOM element if parameter is not an HTML string", function() {
        var link = DOM.create("a#${id}[title=${title}]", {id: "b", title: "c"});

        setFixtures(link._node);

        expect(link).toHaveTagEx("a");
        expect(link.get("id")).toBe("b");
        expect(link.get("title")).toBe("c");
    });

    it("should create new DOM element if the first argument is native element", function() {
        var el = DOM.create(document.createElement("em"));

        setFixtures(el._node);

        expect(el).toHaveTagEx("em");
    });

    it("should parse HTML strings", function() {
        var el = DOM.create("<a><span></span></a>");

        setFixtures(el._node);

        expect(el).toHaveTagEx("a");
        expect(el.child(0)).toHaveTagEx("span");

        expect(DOM.create("<b></b><a></a>").length).toBe(2);
    });

    it("should trim inner html strings", function() {
        var el = DOM.create("   <a><span></span></a>  ");

        expect(el).toHaveTagEx("a");
        expect(el.child(0)).toHaveTagEx("span");
    });

    it("should parse emmet-like expressions", function() {
        var el = DOM.create("ul>li");

        setFixtures(el._node);

        expect(el).toHaveTagEx("ul");
        expect(el.child(0)).toHaveTagEx("li");
    });

    it("should wrap element to div if HTML string has several root nodes", function() {
        var el = DOM.create("<a></a><b></b>");

        expect(el[0]).toHaveTagEx("a");
        expect(el[1]).toHaveTagEx("b");
    });

    it("should throw error if argument is invalid", function() {
        expect(function() { DOM.create(2); }).toThrow();
        expect(function() { DOM.create(null); }).toThrow();
        expect(function() { DOM.create({}); }).toThrow();
    });

});