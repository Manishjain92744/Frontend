# 📸 Modern React Image Upload Application

A beautiful, modern React application for uploading and previewing images with drag-and-drop functionality, loading states, and responsive design.

## ✨ Features

- **Modern UI/UX**: Beautiful gradient design with smooth animations
- **Drag & Drop**: Intuitive drag-and-drop file upload
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Loading States**: Visual feedback during upload process
- **Error Handling**: Graceful error handling with user-friendly messages
- **Image Preview**: Real-time image preview with file information
- **File Validation**: Automatic validation of image files
- **Progress Feedback**: Visual indicators for upload status

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager
- Your backend server running on `http://localhost:8080`

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

3. **Open your browser:**
   Navigate to `http://localhost:3000` to view the application.

## 🛠️ Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.js          # Application header with title
│   ├── ImageUploader.js   # Main upload component with drag & drop
│   └── ImagePreview.js    # Image preview and information display
├── App.js                 # Main application component
└── index.js              # React entry point
```

## 🎨 Design Features

- **Gradient Background**: Beautiful purple-blue gradient
- **Glass Morphism**: Semi-transparent cards with backdrop blur
- **Smooth Animations**: Hover effects and transitions
- **Modern Typography**: Clean, readable fonts
- **Responsive Grid**: Adaptive layout for all screen sizes

## 🔧 Configuration

The application is configured to work with a backend server running on `http://localhost:8080`. If your backend runs on a different port or URL, update the fetch URLs in `src/components/ImageUploader.js`.

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## 🎯 Usage

1. **Upload an Image:**
   - Drag and drop an image file onto the upload area
   - Or click the upload area to browse and select a file
   - Click the "Upload Image" button to upload

2. **View Preview:**
   - After successful upload, the image will appear in the preview panel
   - File information (name, size, type) is displayed below the image

3. **Error Handling:**
   - Invalid file types will show an error message
   - Upload failures are handled gracefully with user feedback

## 🛡️ File Validation

The application validates:
- File type (must be an image)
- File size (displayed to user)
- Upload success/failure

## 🔄 State Management

The application uses React hooks for state management:
- `useState` for local component state
- `useCallback` for optimized event handlers
- Props for parent-child communication

## 🎨 Styling

Built with `styled-components` for:
- Component-scoped styles
- Dynamic styling based on props
- Responsive design
- Modern CSS features

## 🚀 Deployment

To build for production:

```bash
npm run build
```

The build folder contains the optimized production build.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

---

**Enjoy uploading images with style! 🎉** 