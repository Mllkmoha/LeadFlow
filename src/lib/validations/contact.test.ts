import { describe, expect, it } from "vitest";
import { contactSchema, updateContactSchema } from "./contact";

describe("contactSchema", () => {
  const validContact = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1-555-123-4567",
    company: "Acme Corp",
    position: "CEO",
    status: "NEW" as const,
    source: "Referral",
  };

  it("accepts a valid create payload with all fields", () => {
    const result = contactSchema.safeParse(validContact);
    expect(result.success).toBe(true);
  });

  it("accepts a valid create payload with only required fields", () => {
    const minimal = {
      firstName: "Jane",
      lastName: "Smith",
      email: "jane@example.com",
    };
    const result = contactSchema.safeParse(minimal);
    expect(result.success).toBe(true);
  });

  it("accepts firstName at maximum length (100)", () => {
    const payload = { ...validContact, firstName: "a".repeat(100) };
    const result = contactSchema.safeParse(payload);
    expect(result.success).toBe(true);
  });

  it("rejects firstName exceeding maximum length (101)", () => {
    const payload = { ...validContact, firstName: "a".repeat(101) };
    const result = contactSchema.safeParse(payload);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("First name must be 100 characters or less");
    }
  });

  it("accepts lastName at maximum length (100)", () => {
    const payload = { ...validContact, lastName: "a".repeat(100) };
    const result = contactSchema.safeParse(payload);
    expect(result.success).toBe(true);
  });

  it("rejects lastName exceeding maximum length (101)", () => {
    const payload = { ...validContact, lastName: "a".repeat(101) };
    const result = contactSchema.safeParse(payload);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Last name must be 100 characters or less");
    }
  });

  it("accepts email at maximum length (254)", () => {
    const localPart = "a".repeat(64);
    const domain = "b".repeat(185) + ".com";
    const email = `${localPart}@${domain}`;
    const payload = { ...validContact, email };
    const result = contactSchema.safeParse(payload);
    expect(result.success).toBe(true);
  });

  it("rejects email exceeding maximum length (255)", () => {
    const localPart = "a".repeat(65);
    const domain = "b".repeat(185) + ".com";
    const email = `${localPart}@${domain}`;
    const payload = { ...validContact, email };
    const result = contactSchema.safeParse(payload);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Email must be 254 characters or less");
    }
  });

  it("rejects invalid email format", () => {
    const payload = { ...validContact, email: "not-an-email" };
    const result = contactSchema.safeParse(payload);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Invalid email address");
    }
  });

  it("accepts phone at maximum length (50)", () => {
    const payload = { ...validContact, phone: "a".repeat(50) };
    const result = contactSchema.safeParse(payload);
    expect(result.success).toBe(true);
  });

  it("rejects phone exceeding maximum length (51)", () => {
    const payload = { ...validContact, phone: "a".repeat(51) };
    const result = contactSchema.safeParse(payload);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Phone must be 50 characters or less");
    }
  });

  it("accepts phone as optional (undefined)", () => {
    const payload = { ...validContact, phone: undefined };
    const result = contactSchema.safeParse(payload);
    expect(result.success).toBe(true);
  });

  it("accepts company at maximum length (200)", () => {
    const payload = { ...validContact, company: "a".repeat(200) };
    const result = contactSchema.safeParse(payload);
    expect(result.success).toBe(true);
  });

  it("rejects company exceeding maximum length (201)", () => {
    const payload = { ...validContact, company: "a".repeat(201) };
    const result = contactSchema.safeParse(payload);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Company must be 200 characters or less");
    }
  });

  it("accepts company as optional (undefined)", () => {
    const payload = { ...validContact, company: undefined };
    const result = contactSchema.safeParse(payload);
    expect(result.success).toBe(true);
  });

  it("accepts position at maximum length (200)", () => {
    const payload = { ...validContact, position: "a".repeat(200) };
    const result = contactSchema.safeParse(payload);
    expect(result.success).toBe(true);
  });

  it("rejects position exceeding maximum length (201)", () => {
    const payload = { ...validContact, position: "a".repeat(201) };
    const result = contactSchema.safeParse(payload);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Position must be 200 characters or less");
    }
  });

  it("accepts position as optional (undefined)", () => {
    const payload = { ...validContact, position: undefined };
    const result = contactSchema.safeParse(payload);
    expect(result.success).toBe(true);
  });

  it("accepts all valid status values", () => {
    const statuses = ["NEW", "CONTACTED", "INTERESTED", "CONVERTED"] as const;
    statuses.forEach((status) => {
      const result = contactSchema.safeParse({ ...validContact, status });
      expect(result.success).toBe(true);
    });
  });

  it("defaults status to NEW when omitted", () => {
    const rest = {
      firstName: validContact.firstName,
      lastName: validContact.lastName,
      email: validContact.email,
      phone: validContact.phone,
      company: validContact.company,
      position: validContact.position,
      source: validContact.source,
    };
    const result = contactSchema.safeParse(rest);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.status).toBe("NEW");
    }
  });

  it("rejects invalid status", () => {
    const payload = { ...validContact, status: "INVALID" };
    const result = contactSchema.safeParse(payload);
    expect(result.success).toBe(false);
  });

  it("accepts source at maximum length (200)", () => {
    const payload = { ...validContact, source: "a".repeat(200) };
    const result = contactSchema.safeParse(payload);
    expect(result.success).toBe(true);
  });

  it("rejects source exceeding maximum length (201)", () => {
    const payload = { ...validContact, source: "a".repeat(201) };
    const result = contactSchema.safeParse(payload);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Source must be 200 characters or less");
    }
  });

  it("accepts source as optional (undefined)", () => {
    const payload = { ...validContact, source: undefined };
    const result = contactSchema.safeParse(payload);
    expect(result.success).toBe(true);
  });

  it("requires firstName", () => {
    const payload = { ...validContact, firstName: "" };
    const result = contactSchema.safeParse(payload);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("First name is required");
    }
  });

  it("requires lastName", () => {
    const payload = { ...validContact, lastName: "" };
    const result = contactSchema.safeParse(payload);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Last name is required");
    }
  });

  it("requires email", () => {
    const payload = { ...validContact, email: "" };
    const result = contactSchema.safeParse(payload);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Invalid email address");
    }
  });

  it("trims whitespace from firstName", () => {
    const payload = { ...validContact, firstName: "  John  " };
    const result = contactSchema.safeParse(payload);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.firstName).toBe("John");
    }
  });

  it("trims whitespace from lastName", () => {
    const payload = { ...validContact, lastName: "  Doe  " };
    const result = contactSchema.safeParse(payload);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.lastName).toBe("Doe");
    }
  });

  it("trims whitespace from email", () => {
    const payload = { ...validContact, email: "  john@example.com  " };
    const result = contactSchema.safeParse(payload);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.email).toBe("john@example.com");
    }
  });

  it("trims whitespace from phone", () => {
    const payload = { ...validContact, phone: "  +1-555-123-4567  " };
    const result = contactSchema.safeParse(payload);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.phone).toBe("+1-555-123-4567");
    }
  });

  it("trims whitespace from company", () => {
    const payload = { ...validContact, company: "  Acme Corp  " };
    const result = contactSchema.safeParse(payload);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.company).toBe("Acme Corp");
    }
  });

  it("trims whitespace from position", () => {
    const payload = { ...validContact, position: "  CEO  " };
    const result = contactSchema.safeParse(payload);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.position).toBe("CEO");
    }
  });

  it("trims whitespace from source", () => {
    const payload = { ...validContact, source: "  Referral  " };
    const result = contactSchema.safeParse(payload);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.source).toBe("Referral");
    }
  });
});

describe("updateContactSchema", () => {
  it("accepts partial payload with only firstName", () => {
    const result = updateContactSchema.safeParse({ firstName: "Updated" });
    expect(result.success).toBe(true);
  });

  it("accepts partial payload with only lastName", () => {
    const result = updateContactSchema.safeParse({ lastName: "Updated" });
    expect(result.success).toBe(true);
  });

  it("accepts partial payload with only email", () => {
    const result = updateContactSchema.safeParse({ email: "updated@example.com" });
    expect(result.success).toBe(true);
  });

  it("accepts partial payload with only phone", () => {
    const result = updateContactSchema.safeParse({ phone: "+1-555-999-9999" });
    expect(result.success).toBe(true);
  });

  it("accepts partial payload with only company", () => {
    const result = updateContactSchema.safeParse({ company: "New Corp" });
    expect(result.success).toBe(true);
  });

  it("accepts partial payload with only position", () => {
    const result = updateContactSchema.safeParse({ position: "CTO" });
    expect(result.success).toBe(true);
  });

  it("accepts partial payload with only status", () => {
    const result = updateContactSchema.safeParse({ status: "CONVERTED" });
    expect(result.success).toBe(true);
  });

  it("accepts partial payload with only source", () => {
    const result = updateContactSchema.safeParse({ source: "Website" });
    expect(result.success).toBe(true);
  });

  it("accepts empty payload", () => {
    const result = updateContactSchema.safeParse({});
    expect(result.success).toBe(true);
  });

  it("enforces firstName max length in partial update", () => {
    const result = updateContactSchema.safeParse({ firstName: "a".repeat(101) });
    expect(result.success).toBe(false);
  });

  it("enforces lastName max length in partial update", () => {
    const result = updateContactSchema.safeParse({ lastName: "a".repeat(101) });
    expect(result.success).toBe(false);
  });

  it("enforces email max length in partial update", () => {
    const localPart = "a".repeat(65);
    const domain = "b".repeat(185) + ".com";
    const email = `${localPart}@${domain}`;
    const result = updateContactSchema.safeParse({ email });
    expect(result.success).toBe(false);
  });

  it("enforces phone max length in partial update", () => {
    const result = updateContactSchema.safeParse({ phone: "a".repeat(51) });
    expect(result.success).toBe(false);
  });

  it("enforces company max length in partial update", () => {
    const result = updateContactSchema.safeParse({ company: "a".repeat(201) });
    expect(result.success).toBe(false);
  });

  it("enforces position max length in partial update", () => {
    const result = updateContactSchema.safeParse({ position: "a".repeat(201) });
    expect(result.success).toBe(false);
  });

  it("enforces source max length in partial update", () => {
    const result = updateContactSchema.safeParse({ source: "a".repeat(201) });
    expect(result.success).toBe(false);
  });

  it("rejects invalid email in partial update", () => {
    const result = updateContactSchema.safeParse({ email: "not-an-email" });
    expect(result.success).toBe(false);
  });

  it("rejects invalid status in partial update", () => {
    const result = updateContactSchema.safeParse({ status: "INVALID" });
    expect(result.success).toBe(false);
  });

  it("preserves trimming behavior in partial update", () => {
    const result = updateContactSchema.safeParse({ firstName: "  Trimmed  " });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.firstName).toBe("Trimmed");
    }
  });
});
