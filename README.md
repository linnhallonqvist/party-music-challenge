# Party Music Challenge

A party game where teams compete to guess songs based on revealed words and answer trivia questions.

## Adding Songs and Questions

Songs are stored in `src/data/songs.json`. To permanently add new songs, edit this file directly.

### Song Format

Each song follows this structure:

```json
{
  "id": "unique-song-id",
  "title": "Song Title",
  "artist": "Artist Name",
  "words": ["word1", "word2", "word3", "word4", "word5", "word6"],
  "triviaQuestions": [
    { "question": "Question about the song?", "answer": "The answer" },
    { "question": "Another question?", "answer": "Another answer" }
  ]
}
```

- **id**: A unique identifier (e.g., `"song-3"`)
- **words**: 6 words that hint at the song (displayed as boxes in the game)
- **triviaQuestions**: Questions shown after a song is guessed (include both question and answer)

### Note on Backstage (Admin Panel)

The app has a Backstage page (`/admin`) but it is currently non-functional. To add or edit songs, edit `src/data/songs.json` directly.

---

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
