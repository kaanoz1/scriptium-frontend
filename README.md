# Scriptium

**Scriptium** is a project designed to facilitate research and foster discussions among users about religious texts from around the world. It aggregates religious texts from reputable sources recognized by their respective communities. You can find these sources in the **/about** section of the Scriptium website.

Scriptium is primarily intended for theological research and the exchange of ideas about religious texts, but it’s also designed to be accessible for everyday readers. Moreover, Scriptium actively listens to user feedback to improve its features and functionality.

## Scriptium Frontend

This project provides the frontend part of the Scriptium project. It is built with **Next.js**.  
You can find all the dependencies used in the project in the `package.json` file.

## Features

- **Read and Compare:** Read all available texts, review translations, and compare them side by side.
- **Word Analysis:** Analyze words within the texts, explore their roots, and track where these roots appear throughout the scriptures.
- **Multilingual Support:** Currently, Scriptium supports English, with more languages and translations coming soon.
- **Themes:** Switch between light and dark modes for a personalized reading experience.
- **Collections:** Save verses to custom collections, allowing you to organize and review them under specific categories.
- **User Interaction:**
  - Register, log in, follow other users, and engage with their content through reflections and notes.
  - **Reflections** are short insights or thoughts about specific verses shared with the community.
  - **Notes** are longer posts that can be either public or private (feature in development).
- **Upcoming Features:**
  - **Advice System:** A bridge between users and translators. Users can provide feedback on translations, helping translators improve the quality of their work.
  - Communication channels for users to discuss translations directly with translators.
- **Social Login:** Sign in using Google or X (formerly Twitter).
- **Audio Support:** Listen to actual recitations of verses.
- **Advanced Search:** Search for words or phrases in any format across all texts.
- **Statistics:** View graphical representations of verse popularity and user engagement trends.
- **Responsive Design:** Optimized for all devices, from desktops to mobile phones.
- **Etymological Charts:** Visualize the etymology of words used in the texts.

## Main Pages

This section introduces the main pages of the **Scriptium Frontend** project.

### `/`

- **Homepage:** The main landing page of the website.
- Users can search for scriptures and explore the available religious texts.

---

### `/[scriptureCode]`

- **Scripture Overview Page:** Displays all sections within a specific scripture.
- **Example:**
  - `/t` for the Torah will show sections like Genesis, Exodus, etc.
- Users can select a Scripture to view its Sections.

---

### `/[scriptureCode]/[sectionNumber]`

- **Chapter Overview Page:** Shows all chapters within the selected section.
- Each chapter is represented by a number. Users can select a chapter to view its verses.

---

### `/[scriptureCode]/[sectionNumber]/[chapterNumber]`

- **Verse List Page:** Displays all verses in the selected chapter.
- Users are able to:
  - Change translators.
  - Enable/disable footnotes.
  - Show/hide original text, translation, and transliterations (if available).
  - Switch between different versions of the original text. (As for Torah, with nikkud or not)
  - To be directed to verse page of selected one.
  - **(Upcoming Feature):** Listen to audio recitations of the original text.

---

### `/[scriptureCode]/[sectionNumber]/[chapterNumber]/[verseNumber]`

- **Verse Detail Page:** Displays detailed information about a specific verse.
  - Select multiple translators simultaneously for comparison.
  - Enable/disable footnotes, original text, translations, and transliterations.
  - Analyze the roots of each word in the verse.
  - Switch between different versions of the original text. (As for Torah, with nikkud or not)
  - **For Signed-in Users:**
    - Add notes and reflections.
    - View reflections and notes from other users.
  - **(Upcoming Feature):** Audio recitation playback.

---

### `/root/[scriptureCode]/[rootLatin]`

- **Root Analysis Page:**
  - Displays all verses containing at least one word derived from the specified root.
  - Helps users track the usage and context of specific word roots.

---

### `/about`

- **About Page:**
- Provides information about the **Scriptium** project and the frontend application.

---

### `/auth/signin` or `/auth/signup`

- **Authentication Pages:**
  - Allows users to sign in or sign up for an account.
  - Supports third-party login options (e.g., Google, X/Twitter).

---

### `/savings`

- **User Collections Page:**
- **For Signed-in Users:**
  - View and manage saved verses.
  - Organize verses into custom collections.

---

### `/settings`

- **Account Settings Page:**
- **For Signed-in Users:**
  - Manage account details.
  - View personal reflections, notes, likes, and other user-related content.

---

### `/user/[username]`

- **User Profile Page:**
- Displays public information about a specific user.
- **Features:**
  - View the user's notes, reflections, and collections (if shared publicly).

---

## Contribute

Thank you for your interest in contributing to **Scriptium**! Your contributions help improve the project and create a better experience for everyone. Please follow the steps below to ensure of a contribution process:

### 🚀 **How to Contribute**

1. **Check for Existing Issues:**  
   Before starting to work on something, check the [Issues](https://github.com/scriptium-project/scriptium-frontend/issues) to see if the problem has already been reported or if someone else is working on it.

   - **If the issue exists:** Feel free to join the discussion.
   - **If not:** Open a new issue to describe the problem or feature request.

2. **Fork the Repository:**

   - Click the **"Fork"** button at the top right of the repository page.
   - Clone your forked repository to your local machine:

     ```bash
     git clone https://github.com/scriptium-project/scriptium-frontend.git
     ```

3. **Create a Branch:**

   - Always create a new branch for your changes:

     ```bash
     git checkout -b feature-name
     ```

4. **Work on Your Changes:**

   - Make the necessary updates in your branch.
   - If you opened an issue, keep an eye on any feedback or comments.
   - **Write clear and concise commit messages:**

     ```bash
     git add .
     git commit -m "Fix: Issue description here"
     ```

5. **Test Your Changes:**

   - Ensure your changes don’t break existing features.
   - Run the project locally to verify everything works as expected.

6. **Submit a Pull Request (PR):**

   - Push your branch to GitHub:

     ```bash
     git push origin "Feat: Feature Name Here"
     ```

   - Go to the original repository and click **"New Pull Request."**
   - Provide a **detailed description** of the changes you’ve made, including:
     - The problem you’re solving
     - How you fixed it
     - Any additional notes for reviewers

7. **Review and Feedback:**
   - A review process will follow. Address any requested changes promptly.
   - Discussions are always welcome to ensure code quality and project alignment.

---

### **Thank You!**

Every contribution no matters—big or small. Our team, Even though I’m currently the sole maintainer of this project, is thankful for you!. Your support is invaluable. Thank you for being a part of **Scriptium** and helping it grow!

## License

This project is licensed under the **Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)** License.

For more details, see the [LICENSE](LICENSE) file or visit [Creative Commons License](https://creativecommons.org/licenses/by-nc-sa/4.0/).
