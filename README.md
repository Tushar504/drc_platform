# Disaster Relief Coordination Platform

This is a full-stack application designed to be a central hub for coordinating disaster relief efforts. It features a robust Node.js/Express backend deployed on Render, a Supabase database with geospatial capabilities, and a vanilla JavaScript frontend for interaction.

The entire platform, from backend logic to frontend UI, was built in collaboration with an AI assistant (Cursor), demonstrating a modern, accelerated development workflow.

## Features

### Backend
- **Disaster Data Management:** Full CRUD (Create, Read, Update, Delete) functionality for disaster records, complete with ownership and an audit trail for every change.
- **AI-Powered Geocoding:** Uses the Google Gemini API to automatically extract location names from unstructured text (like a disaster description) and converts them into precise latitude/longitude coordinates.
- **Real-Time Social Media Monitoring:** A mock endpoint to simulate fetching social media reports for needs, offers, and alerts.
- **Geospatial Resource Mapping:** Leverages Supabase (PostGIS) to perform powerful geospatial queries, such as finding all available shelters or resources within a 10km radius of a disaster.
- **Official Updates Aggregation:** Scrapes official news and updates from relief organization websites (like the Red Cross) using Cheerio.
- **AI-Powered Image Verification:** Uses the Google Gemini API to analyze user-uploaded disaster images for authenticity.
- **Real-Time Communication:** Implements WebSockets with Socket.IO to broadcast live updates to all connected clients for new disasters, social media posts, and resources.
- **Robust & Scalable:** Includes caching for API responses, structured logging, and efficient database indexing (GIST for geospatial, GIN for tags).

### Frontend
- **Single-Page Application:** A self-contained `index.html` file that acts as a full-featured client.
- **Interactive UI:** A two-column layout allows for creating new disasters while simultaneously viewing existing data and real-time event logs.
- **Smart Forms:** The "Create Disaster" form automatically geocodes the location from the description, simplifying data entry.
- **Real-Time Updates:** The UI listens for WebSocket events and automatically refreshes the disaster list and displays incoming data in a live event log.
- **Dynamic Details:** Users can click on any disaster to load and view its associated data, such as social media feeds and nearby resources.
- **UX-Focused:** Includes loading spinners on buttons for immediate user feedback and scrollable content panels to handle large amounts of data gracefully.

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** Supabase (PostgreSQL with PostGIS extension)
- **Real-Time:** Socket.IO
- **Geocoding & AI:** Google Gemini API
- **Web Scraping:** Cheerio, Axios
- **Validation:** Zod
- **Deployment:** Render
- **Frontend:** HTML5, CSS3, Vanilla JavaScript

## How to Use the Frontend

1.  Simply open the `index.html` file in any modern web browser.
2.  The application will automatically connect to the deployed backend on Render.
3.  Use the forms on the left to create disasters and test other endpoints.
4.  View the list of disasters on the right. Click any disaster to see its details and fetch related data.
5.  Watch the "Real-Time Event Log" to see live updates broadcast from the server.

---

## How Cursor Accelerated Development (AI Collaboration)

This project was built from scratch using Cursor as an AI pair programmer. The AI assistant was instrumental in every stage, from ideation to deployment and debugging.

### 1. **Initial Scaffolding & Boilerplate**
- **Prompt:** "Generate a production-ready Express.js project structure with controllers, routes, and models."
- **Result:** The AI instantly created the entire directory structure and boilerplate code, saving significant setup time.
- **Prompt:** "Give me the CRUD code for my `disasters` data model."
- **Result:** The AI generated the complete `disasterController.js` and `disasterRoutes.js` files, including logic for creating, reading, updating, and deleting records.

### 2. **Implementing Complex Logic**
- **Prompt:** "Generate a Node.js route that uses the Gemini API for location extraction and OpenStreetMap for geocoding."
- **Result:** The AI created the `geocodeController.js`, including the correct `fetch` calls, prompts for Gemini, and logic to handle the API responses.
- **Prompt:** "Show me how to write a Supabase geospatial query to find resources within 10km of a point."
- **Result:** The AI provided the exact PostGIS function (`ST_DWithin`) and the Supabase RPC call needed for efficient location-based searches.

### 3. **Database and Schema Design**
- **Prompt:** "Generate the SQL statements for my Supabase tables, including `disasters`, `resources`, and `cache`. Add geospatial indexes on location and a GIN index on tags."
- **Result:** The AI produced the complete, optimized SQL schema, which was pasted directly into the Supabase SQL editor. This avoided manual table creation and ensured high-performance queries from the start.

### 4. **Frontend Generation**
- **Prompt:** "Create a minimal but complete frontend in a single `index.html` file to test all my backend APIs, including real-time updates via WebSockets."
- **Result:** The AI generated the entire `index.html` file, including all HTML structure, CSS styling, and the JavaScript logic for API calls and WebSocket event handling.
- **Prompt:** "Generate a `fetch` call for `POST /disasters`."
- **Result:** The AI provided the exact JavaScript code needed to interact with the backend endpoints.

### 5. **Debugging and Explanations**
- **Prompt:** "I'm getting a 'socket hang up' error when I try to connect with Postman. Why?"
- **Result:** The AI correctly diagnosed the issue as a CORS or Socket.IO configuration problem and provided the correct configuration for both the server and the Postman client URL (`ws://.../socket.io/...`).
- **Prompt:** "What does `io.emit` do?" or "Explain what `ST_SetSRID` means."
- **Result:** The AI acted as a live documentation source, providing clear, simple explanations of complex concepts directly within the IDE.

### 6. **Iterative Refinement and UX Improvements**
- **Prompt:** "Do you think we need to add a loader when we click on the buttons?"
- **Result:** The AI agreed it was a good idea for UX and immediately provided the necessary CSS for a spinner and the JavaScript functions (`showLoader`, `hideLoader`) to implement it.
- **Prompt:** "We need to add a scrollbar to the disasters block."
- **Result:** The AI added the `max-height` and `overflow-y` CSS properties to the correct element.

This collaborative process demonstrates how AI assistants can serve as a powerful force multiplier, handling boilerplate, implementing complex logic, debugging issues, and suggesting improvements, allowing the developer to focus on high-level architecture and product goals.
