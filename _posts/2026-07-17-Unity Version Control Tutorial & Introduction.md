---
layout: post
title: "Version Control Tutorial & Introduction"
date: 2026-07-17
categories: ["Teaching & Learning"]
tags: ["unity", "game-development", "version-control", "tutorial"]
---
# Unity Version Control Tutorial & Introduction

Unity Version Control (UVCS, formerly known as Plastic SCM) is Unity's official version control system designed specifically for game development. It excels at handling large binary files, offers high-performance collaboration, and supports both centralized and distributed workflows—making it ideal for teams of artists and programmers alike.

---

## 1. What is Unity Version Control?

Unity Version Control is a scalable, engine-agnostic version control and source code management tool built for 3D projects and game development.

### Key Advantages

- **Superior large file handling**: Optimized for textures, models, audio, and other binaries.
- **Dual workflows**: Plastic workspace (distributed, great for programmers) and Gluon workspace (centralized, artist-friendly).
- **Smart Locks**: Intelligent file locking to minimize merge conflicts.
- **Seamless Unity Editor integration**: Perform check-ins, branching, merging, and more directly in the Editor.
- **Cloud or on-premises**: Host on Unity Cloud for convenience or self-host for full control.
- **Visual Branch Explorer**: Easily visualize merge history and project structure.

Compared to Git or Perforce, UVCS provides a smoother experience for game asset collaboration, especially for mixed-discipline teams.

---

## 2. Quick Start Guide (For Beginners)

### Create a New Project with UVCS via Unity Hub

1. Open **Unity Hub**.
2. Click **New project**.
3. Enter your **Project Name** and select a **Location**.
4. Check the **Use Unity Version Control** box.
5. Review the auto-filled **Repository Name** and **Server location** (usually the closest server based on your location).
6. Click **Create project**.

### Add UVCS to an Existing Project

1. In Unity Hub, right-click your project.
2. Select **Use Unity Version Control**.
3. Review and confirm repository details, then create.

Once the project opens in the Unity Editor, the **Unity Version Control** tab will appear automatically (if not, go to **Window > Unity Version Control**).

### Onboarding Wizard

- Sign in with your Unity ID.
- Create or select an Organization.
- Create a Repository and Workspace.
- An `.ignore` file is automatically generated (excludes `Library/`, `Temp/`, etc.).
- The first check-in happens automatically.

**Official Quick Start**:
[Unity Version Control: Quick start guide - Unity Learn](https://learn.unity.com/tutorial/unity-version-control-guide)

---

## 3. Core Operations in the Unity Editor

The Unity Version Control tab typically includes these main views:

### Pending Changes

- View local modifications.
- Select files, add a comment, and **Check in** (commit).
- Supports partial check-ins.

### Incoming Changes

- See changes from teammates.
- Update your workspace and resolve conflicts (with UnityYAMLMerge support for scenes and prefabs).

### Changesets

- Browse project history.
- Compare changesets.
- Switch or revert to a previous version.

### Branches

- Create new branches.
- Switch branches.
- Perform merges.

**Other Common Tasks**:

- **Ignore files**: Configure exclusion lists.
- **Undo changes**: Revert local modifications.
- **View changes**: File diff comparison.
- **Branch Explorer**: Visual overview of branches and merges.

**Full list of Editor tutorials**:
[Editor version control tutorials](https://docs.unity.com/unity-version-control/vcs-plugins/unityeditor-plugin/tutorials-landing)

---


## 4. Branching Strategies for Different Team Sizes

### For Solo Developers (Most Common Student Scenario)

Even when working alone, version control helps you develop multiple features safely without breaking your main project.

**Recommended Strategy for One Person**:

1. **Main Branch** (`main` or `trunk`): Keep this stable. This is your "production-ready" version.
2. Create a **feature branch** for each new feature or system you’re working on:
   - Examples: `feature/player-movement`, `feature/inventory-system`, `feature/ui-menu`, `feature/enemy-ai`.
3. Work on the feature branch until it’s complete and tested.
4. Merge the feature branch back into `main`.
5. Delete the feature branch after merging (or keep it for reference).

**Workflow in UVC**:

- In the **Branches** tab or **Branch Explorer**, right-click the main branch → **Create Branch**.
- Switch to the new branch using **Switch to Branch**.
- Develop and check in changes frequently with clear comments.
- When ready: Switch back to `main`, then **Merge** from your feature branch.
- Use **Shelve** if you need to temporarily set aside unfinished work.

This approach gives you isolation for experimentation while keeping your main project stable. It’s perfect for students juggling multiple features or school assignments.

### For Small Teams (2–6 People)

A simple and effective strategy:

- **/production** (or `main`): Final, stable builds only.
- **/dev**: Main development branch where programmers merge their work.
- **/art**: Dedicated branch for artists to work on assets, scenes, and prefabs.

**User / Feature Sub-branches**:

- Programmers: `/dev/programmerA`, `/dev/programmerB`, or `/dev/feature-name`.
- Artists: `/art/artistC`, `/art/character-design`, etc.

**Merging Flow**:

1. Work in your personal sub-branch.
2. When ready, merge your sub-branch into `/dev` (for code) or `/art` (for assets).
3. Periodically merge `/dev` ↔ `/art` as needed (e.g., when new assets are required for coding features).
4. Once a milestone is complete, merge from `/dev` or `/art` into `/production`.

**How to Implement in UVC**:

- Use the **Branch Explorer** (visual tree view) to create branches and track relationships.
- Right-click a branch → **Create Branch** for sub-branches.
- Use **Merge** tool in the Editor or Desktop Client.
- Enable **Smart Locks** on shared assets (e.g., core scenes or prefabs) to prevent simultaneous edits.
- Review changesets before merging.

This structure reduces conflicts while allowing parallel work.


---


## 5. Full Development Workflow Using UVCS

1. **Setup**: Create workspace + repository (as in Quick Start).
2. **Initial Check-in**: Commit your starting project files.
3. **Daily Workflow**:
   - Pull incoming changes at the start of the day.
   - Create/switch to a feature branch.
   - Work and check in frequently with meaningful comments (e.g., “Added player jump mechanic”).
   - Use **Pending Changes** to review before committing.
4. **Testing & Review**: Switch to main branch and merge your feature.
5. **Conflict Resolution**: Use built-in tools + UnityYAMLMerge for scenes/prefabs.
6. **Backup & History**: Everything is versioned — easily revert with **Switch to Changeset**.
7. **Collaboration** (if needed): Invite members via the gear icon → **Invite Members to Workspace**.

**Best Practices**:

- Commit small, frequent changes.
- Write clear commit messages.
- Organize your project folder structure well.
- Set Asset Serialization to **Force Text**.
- Use `.ignore` rules to exclude unnecessary files.

**Recommended Reading**:

- [Best practices for project organization and version control (Unity 6 edition)](https://unity.com/resources/best-practices-version-control-unity-6)
- [Ultimate Guide to Setting Up Version Control &amp; DevOps in Unity 6](https://unity.com/blog/complete-guide-version-control-devops-unity-6)

---



## 6. Advanced Features & Best Practices

### Recommended Branching Strategy (Task Branch Workflow)

- Keep the main branch stable.
- Create short-lived branches for individual tasks or features.
- Merge frequently to reduce conflicts.
- Use Smart Locks for critical assets.

### Project Organization Best Practices

- **Folder Structure**: Organize `Assets/` with clear subfolders (`Art/`, `Scripts/`, `Scenes/`, `Prefabs/`, etc.).
- **Naming Conventions**: Avoid spaces; use camelCase.
- **Split Scenes**: Avoid monolithic scenes.
- **Asset Serialization**: Set to **Force Text** in Project Settings > Editor.
- **Ignore Rules**: Leverage the auto-generated `ignore.conf`.

### Team Collaboration Workflow

1. Invite members via the gear icon in the UVCS tab > **Invite Members to Workspace**.
2. Teammates join the workspace.
3. Regularly pull incoming changes.
4. Resolve conflicts using UnityYAMLMerge.

**Highly Recommended Resources**:

- [Best practices for project organization and version control (Unity 6 edition)](https://unity.com/resources/best-practices-version-control-unity-6) — Nearly 100 pages of expert guidance.
- [Ultimate Guide to Setting Up Version Control &amp; DevOps in Unity 6](https://unity.com/blog/complete-guide-version-control-devops-unity-6)

---

## 7. Desktop Client & CLI

While Editor integration covers most needs, install the Desktop Client for advanced operations:

- Download from the Unity Version Control dashboard or official site.
- Available for Windows, macOS, and Linux.
- **CLI (`cm`)**: Powerful for scripting and automation.

---

## 8. Common Issues & Solutions

- **Merge Conflicts**: Use UnityYAMLMerge for automatic handling of Prefabs and Scenes.
- **Performance with Large Files**: UVCS handles this natively—no extra LFS required.
- **Permissions**: Manage roles in the Unity Dashboard.
- **Migration**: See official support articles for moving from legacy Plastic SCM.

More FAQs:
[Unity Version Control Support Help Center](https://support.unity.com/hc/en-us/sections/13795457232532-Unity-Version-Control)

---

## 9. Comparison with Other Version Control Systems

| Solution                        | Best For                      | Large Files        | Unity Integration | Learning Curve |
| ------------------------------- | ----------------------------- | ------------------ | ----------------- | -------------- |
| **Unity Version Control** | Mixed artist/programmer teams | Excellent          | Native (Best)     | Low            |
| Git + Git LFS                   | Programmer-led teams          | Good (with config) | Plugin-based      | Medium         |
| Perforce                        | AAA large-scale projects      | Excellent          | Good              | High           |

---

## 10. Official Resources & Further Learning

### Core Documentation

- [Add version control for your projects](https://docs.unity.com/unity-version-control/get-started-vcs-hub)
- [Unity Version Control Documentation Hub](https://docs.unity.com/unity-version-control/)
- [Version Control Settings - Unity Manual](https://docs.unity3d.com/Manual/class-VersionControlSettings.html)

### Unity Learn Tutorials

- [Create a Unity Version Control workspace and repository](https://learn.unity.com/tutorial/create-a-plastic-scm-workspace-and-repository)
- [Collaborate with Unity Version Control](https://learn.unity.com/tutorial/collaborate-with-plastic-scm)
- [Get started with Unity Version Control learning project](https://learn.unity.com/project/getting-started-with-plastic-scm)

### Guides & Articles

- [How to get started with Unity Version Control](https://unity.com/how-to/redeem/version-control)
- [Guide to Collaborative Development With Unity Asset Manager &amp; Version Control](https://unity.com/resources/collaborative-development-asset-manager-version-control)

### Videos

- Search YouTube for “Unity Version Control Tutorial” for official walkthroughs.

---

## Conclusion

Unity Version Control significantly lowers the barrier to effective version control in game development, allowing artists and programmers to focus on creation rather than tool friction. Start with the official e-book and Unity Learn tutorials, then gradually adopt branching and locking strategies.

**Get Started Today**: Open Unity Hub, create a new project with UVCS enabled, and make your first check-in!
