# simple-notes-app

## Prerequisites
Before running this project:
- Node.js (v18 or higher)
- npm


## Setup Instructions
1. Clone the repository
```
git clone https://github.com/KesnK/simple-notes-app.git
cd simple-notes-app
```

2. Install dependencies

```
npm install
npm install -g @ionic/cli
npm install -g @angular/cli
npm install firebase @angular/fire
```
Verify installations (if you want)
```
ionic –version # Should show: 7.2.1 (or similar)
ng –version # Should show: 20.1.4 (or similar)
```

3. Navigate to project folder (If not already in)
```
cd simple-notes-app
```

4. Run the project
```
ionic serve
```

### Alternate Setup

1. Download zip + Extract zip
2. Install dependencies

```
npm install
npm install -g @ionic/cli
npm install -g @angular/cli
npm install firebase @angular/fire
```

Verify installations
```
ionic –version # Should show: 7.2.1 (or similar)
ng –version # Should show: 20.1.4 (or similar)
```

3. Navigate to project folder (If not already in)
```
cd simple-notes-app
```

4. Run the project
```
ionic serve
```

## Firebase Services Used

The project uses the following Firebase modules:
- Firestore Database – for storing app data
- Authentication – for user login and signup
- Storage – for image/file uploads

## Basic Project Tree
```
+---Project Root
    | +---src
    |   +---app
    |   |   +---guards
    |   |   +---home
    |   |   +---models
    |   |   +---pages
    |   |   |   +---add-note
    |   |   |   +---edit
    |   |   |   +---home
    |   |   |   +---login
    |   |   |   +---notes
    |   |   |   \---register
    |   |   \---services
    |   +---assets
    |   |   \---icon
    |   +---environments
    |   \---theme
    | +---www
    |     \---assets
    |         \---icon
    \---README.md
```

## Contributors
- Duncan Lim Hao Yang
- Kesn Kanagasaba
- Ruhan A/L S. Gopi
