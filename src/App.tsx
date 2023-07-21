import { useState } from 'react'

import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'
import { ArticleList } from './components/pages/ArticleList/ArticleList'
import { Article } from './components/pages/Article/Article';
import { AddArticleForm } from './components/pages/AddArticleForm/AddArticleForm';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ArticleList />} />
          <Route path="/add" element={<AddArticleForm />} />
          <Route path="/article/:id" element={<Article />} />
          <Route path="/edit/:id" element={<AddArticleForm />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
