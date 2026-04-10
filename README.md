# KeyLabs

KeyLabs is an online "touch typing" game inspired by typing platforms such as MonkeyType and TypeRacer, as well as aim trainers like AimLabs and Aimbooster.

The goal of KeyLabs is to combine typing and aiming mechanics into a single competitive training experience.

## Project Background

KeyLabs was originally developed during the Terrible Ideas Hackathon, and later continued in collaboration with [Antga](https://github.com/AntGa) in this repository: https://github.com/RuffByte/KeyLabs

Due to limited time and experience during development, many features remained unpolished or incomplete, and the project required significant refactoring. As a result, it did not fully reach its intended potential at the time.

This version of the project is a solo development continuation of the original repository, focusing on rebuilding and improving the system over time.

## Getting Started

```bash
git clone https://github.com/tulza/keyLabs.git
```

change directory to the project then install dependencies

```bash
cd .\keyLabs\
bun install
```

Create the .env file then update the values,

```env
cp .env-example .env
```

run development server

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---