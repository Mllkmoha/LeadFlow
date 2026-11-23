import { describe, expect, it } from "vitest";
import { activitySchema, updateActivitySchema } from "./activity";

describe("activitySchema", () => {
  const validActivity = {
    type: "CALL" as const,
    title: "Follow up call",
    content: "Discuss project details and next steps",
    contactId: "contact-123",
    dueDate: "2026-12-01",
  };

  it("accepts a valid create payload with all fields", () => {
    const result = activitySchema.safeParse(validActivity);
    expect(result.success).toBe(true);
  });

  it("accepts a valid create payload with only required fields", () => {
    const minimal = {
      type: "EMAIL" as const,
      title: "Send proposal",
      contactId: "contact-456",
    };
    const result = activitySchema.safeParse(minimal);
    expect(result.success).toBe(true);
  });

  it("accepts title at maximum length (200)", () => {
    const payload = { ...validActivity, title: "a".repeat(200) };
    const result = activitySchema.safeParse(payload);
    expect(result.success).toBe(true);
  });

  it("rejects title exceeding maximum length (201)", () => {
    const payload = { ...validActivity, title: "a".repeat(201) };
    const result = activitySchema.safeParse(payload);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Title must be 200 characters or less");
    }
  });

  it("accepts content at maximum length (10,000)", () => {
    const payload = { ...validActivity, content: "a".repeat(10000) };
    const result = activitySchema.safeParse(payload);
    expect(result.success).toBe(true);
  });

  it("rejects content exceeding maximum length (10,001)", () => {
    const payload = { ...validActivity, content: "a".repeat(10001) };
    const result = activitySchema.safeParse(payload);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Description must be 10,000 characters or less");
    }
  });

  it("accepts contactId at maximum length (100)", () => {
    const payload = { ...validActivity, contactId: "a".repeat(100) };
    const result = activitySchema.safeParse(payload);
    expect(result.success).toBe(true);
  });

  it("rejects contactId exceeding maximum length (101)", () => {
    const payload = { ...validActivity, contactId: "a".repeat(101) };
    const result = activitySchema.safeParse(payload);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Invalid contact ID");
    }
  });

  it("accepts all valid activity types", () => {
    const types = ["CALL", "EMAIL", "MEETING", "TASK"] as const;
    types.forEach((type) => {
      const result = activitySchema.safeParse({ ...validActivity, type });
      expect(result.success).toBe(true);
    });
  });

  it("rejects invalid activity type", () => {
    const payload = { ...validActivity, type: "INVALID" };
    const result = activitySchema.safeParse(payload);
    expect(result.success).toBe(false);
  });

  it("requires title", () => {
    const payload = { ...validActivity, title: "" };
    const result = activitySchema.safeParse(payload);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Title is required");
    }
  });

  it("requires contactId", () => {
    const payload = { ...validActivity, contactId: "" };
    const result = activitySchema.safeParse(payload);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Contact is required");
    }
  });

  it("accepts optional content as undefined", () => {
    const payload = { ...validActivity, content: undefined };
    const result = activitySchema.safeParse(payload);
    expect(result.success).toBe(true);
  });

  it("accepts optional dueDate as undefined", () => {
    const payload = { ...validActivity, dueDate: undefined };
    const result = activitySchema.safeParse(payload);
    expect(result.success).toBe(true);
  });

  it("accepts valid dueDate string", () => {
    const payload = { ...validActivity, dueDate: "2026-12-31T23:59:59.000Z" };
    const result = activitySchema.safeParse(payload);
    expect(result.success).toBe(true);
  });

  it("rejects invalid dueDate string", () => {
    const payload = { ...validActivity, dueDate: "not-a-date" };
    const result = activitySchema.safeParse(payload);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Invalid due date");
    }
  });

  it("trims whitespace from title", () => {
    const payload = { ...validActivity, title: "  Follow up call  " };
    const result = activitySchema.safeParse(payload);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.title).toBe("Follow up call");
    }
  });

  it("trims whitespace from content", () => {
    const payload = { ...validActivity, content: "  Description with spaces  " };
    const result = activitySchema.safeParse(payload);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.content).toBe("Description with spaces");
    }
  });

  it("trims whitespace from contactId", () => {
    const payload = { ...validActivity, contactId: "  contact-123  " };
    const result = activitySchema.safeParse(payload);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.contactId).toBe("contact-123");
    }
  });
});

describe("updateActivitySchema", () => {
  it("accepts partial payload with only title", () => {
    const result = updateActivitySchema.safeParse({ title: "Updated title" });
    expect(result.success).toBe(true);
  });

  it("accepts partial payload with only content", () => {
    const result = updateActivitySchema.safeParse({ content: "Updated content" });
    expect(result.success).toBe(true);
  });

  it("accepts partial payload with only completed", () => {
    const result = updateActivitySchema.safeParse({ completed: true });
    expect(result.success).toBe(true);
  });

  it("accepts empty payload", () => {
    const result = updateActivitySchema.safeParse({});
    expect(result.success).toBe(true);
  });

  it("accepts completed as false", () => {
    const result = updateActivitySchema.safeParse({ completed: false });
    expect(result.success).toBe(true);
  });

  it("rejects invalid type in partial update", () => {
    const result = updateActivitySchema.safeParse({ type: "INVALID" });
    expect(result.success).toBe(false);
  });

  it("enforces title max length in partial update", () => {
    const result = updateActivitySchema.safeParse({ title: "a".repeat(201) });
    expect(result.success).toBe(false);
  });

  it("enforces content max length in partial update", () => {
    const result = updateActivitySchema.safeParse({ content: "a".repeat(10001) });
    expect(result.success).toBe(false);
  });

  it("enforces contactId max length in partial update", () => {
    const result = updateActivitySchema.safeParse({ contactId: "a".repeat(101) });
    expect(result.success).toBe(false);
  });

  it("accepts valid dueDate in partial update", () => {
    const result = updateActivitySchema.safeParse({ dueDate: "2026-12-31" });
    expect(result.success).toBe(true);
  });

  it("rejects invalid dueDate in partial update", () => {
    const result = updateActivitySchema.safeParse({ dueDate: "not-a-date" });
    expect(result.success).toBe(false);
  });

  it("preserves trimming behavior in partial update", () => {
    const result = updateActivitySchema.safeParse({ title: "  Trimmed  " });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.title).toBe("Trimmed");
    }
  });
});
