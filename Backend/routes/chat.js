
import express from "express";
import { v4 as uuidv4 } from "uuid";

import Thread from "../models/Thread.js";
import getGroqResponse from "../utils/groq.js";

const router = express.Router();

// Test route - Create a new thread
router.post("/test", async (req, res) => {
  try {
    const thread = new Thread({
      threadId: uuidv4(),
      title: "Testing New Thread"
    });

    const response = await thread.save();

    res.status(201).json(response);

  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Failed to save in DB"
    });
  }
});

// Get all threads
router.get("/thread", async (req, res) => {
  try {
    const threads = await Thread.find({})
      .sort({ updatedAt: -1 });

    res.json(threads);

  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Failed to fetch threads"
    });
  }
});

// Get a particular thread
router.get("/thread/:threadId", async (req, res) => {
  const { threadId } = req.params;

  try {
    const thread = await Thread.findOne({ threadId });

    if (!thread) {
      return res.status(404).json({
        error: "Thread not found"
      });
    }

    res.json(thread.messages);

  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Failed to fetch chat"
    });
  }
});

// Delete a thread
router.delete("/thread/:threadId", async (req, res) => {
  const { threadId } = req.params;

  try {
    const deletedThread = await Thread.findOneAndDelete({
      threadId
    });

    if (!deletedThread) {
      return res.status(404).json({
        error: "Thread not found"
      });
    }

    res.status(200).json({
      success: "Thread deleted successfully"
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Failed to delete thread"
    });
  }
});

// Send message and get AI response
router.post("/chat", async (req, res) => {
  const { threadId, message } = req.body;

  if (!threadId || typeof message !== "string" || !message.trim()) {
    return res.status(400).json({
      error: "Missing or invalid required fields"
    });
  }

  try {
    let thread = await Thread.findOne({ threadId });

    if (!thread) {
      // Create a new thread
      thread = new Thread({
        threadId,
        title: message,
        messages: [
          {
            role: "user",
            content: message
          }
        ]
      });

    } else {
      // Add user message to existing thread
      thread.messages.push({
        role: "user",
        content: message
      });
    }

    // Get response from Groq
    const assistantReply = await getGroqResponse(message);

    // Add assistant response
    thread.messages.push({
      role: "assistant",
      content: assistantReply
    });

    thread.updatedAt = new Date();

    // Save conversation in MongoDB
    await thread.save();

    res.json({
      reply: assistantReply
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Something went wrong"
    });
  }
});

export default router;
