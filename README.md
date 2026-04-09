# Proyecto React + Vite

Este proyecto está creado con **React** usando **Vite**. A continuación se explican los pasos para ejecutarlo localmente.

---

## Requisitos

- [Node.js](https://nodejs.org/) (v16 o superior)
- npm (viene con Node.js) o [Yarn](https://yarnpkg.com/)

---

## Instalación

### Clonar el repositorio:
git clone 

#### Entrar en la carpeta del proyecto:
cd tu-proyecto

### Instalar dependencias:
Con npm:
npm install 

Con Yarn:
yarn

### Ejecución en modo desarrollo

Con npm:
npm run dev

Con Yarn:
yarn dev

### Esto iniciará un servidor de desarrollo y normalmente abrirá la app en:
http://localhost:5173


### Construcción para producción

Con npm:
npm run build

Con Yarn:
yarn build



Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
