/* eslint-disable react/no-unescaped-entities */
'use client'

import { useState, useEffect, ChangeEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Plus, Trash2, Github, Languages, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { toast, Toaster } from 'sonner'
import { translations, languages } from '@/lib/translations'
import { HamburgerMenu } from '@/components/hamburger-menu'
import { Todo, AnimatedTextProps, LanguageDropdownProps } from '@/lib/types'

function LanguageDropdown({ language, setLanguage }: LanguageDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdown = document.getElementById('language-dropdown');
      if (dropdown && !dropdown.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" id="language-dropdown">
      <Button
        variant="outline"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700"
      >
        <Languages className="h-5 w-5" />
      </Button>
      
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50"
        >
          <div className="py-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={`${
                  language === lang.code
                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                    : 'text-gray-700 dark:text-gray-300'
                } group flex w-full items-center justify-between px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700`}
              >
                <div className="flex items-center">
                  <lang.FlagIcon className="h-4 w-4 mr-2" />
                  {lang.name}
                </div>
                {language === lang.code && (
                  <Check className="h-4 w-4 text-green-500" />
                )}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}

function AnimatedText({ children }: AnimatedTextProps) {
  return (
    <motion.span
      key={String(children)}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.span>
  );
}

export function TodoAppComponent() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState('')
  const [darkMode, setDarkMode] = useState(false)
  const [todoToDelete, setTodoToDelete] = useState<Todo | null>(null)
  const [showClearAllConfirm, setShowClearAllConfirm] = useState(false)
  const [language, setLanguage] = useState('en')
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

  useEffect(() => {
    const browserLang = navigator.language.split('-')[0]
    if (languages.some(lang => lang.code === browserLang)) {
      setLanguage(browserLang)
    }
  }, [])

  const t = translations[language]

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }])
      setNewTodo('')
      toast.success(t.todoAdded)
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value)
  }

  const deleteTodo = (id: number) => {
    const todo = todos.find((todo: Todo) => todo.id === id)
    if (todo) {
      setTodoToDelete(todo)
    }
  }

  const confirmDelete = () => {
    if (todoToDelete) {
      setTodos(todos.filter(todo => todo.id !== todoToDelete.id))
      toast.error(t.todoDeleted.replace('{todo}', todoToDelete.text))
      setTodoToDelete(null)
    }
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map((todo: Todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const clearAllTodos = () => {
    setTodos([])
    setShowClearAllConfirm(false)
    toast.error(t.allTodosDeleted)
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300 flex flex-col pt-16 font-['Miracode']"
    >
      <Toaster 
        position="bottom-right"
        toastOptions={{
          style: {
            background: darkMode ? '#1F2937' : '#FFFFFF',
            color: darkMode ? '#E5E7EB' : '#1F2937',
            border: '1px solid',
            borderColor: darkMode ? '#374151' : '#E5E7EB',
          },
        }}
      />
      
      {/* Nascondi i bottoni originali su mobile */}
      <div className="hidden md:block">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setDarkMode(!darkMode)}
          className="text-gray-800 dark:text-gray-200 absolute top-4 right-4 border border-gray-200 dark:border-gray-700"
        >
          {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>

        <div className="absolute top-4 right-16">
          <LanguageDropdown language={language} setLanguage={setLanguage} />
        </div>
      </div>

      {/* Aggiungi il menu hamburger */}
      <div className="absolute top-4 right-4">
        <HamburgerMenu
          isOpen={isMenuOpen}
          setIsOpen={setIsMenuOpen}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          language={language}
          setLanguage={setLanguage}
        />
      </div>

      <div className="flex-1 container mx-auto max-w-md p-4">
        <motion.div 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="mb-8 flex items-center justify-between"
        >
          <motion.h1 
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold text-gray-800 dark:text-gray-200 font-['Miracode']"
          >
            Todo List
          </motion.h1>
          {todos.length > 0 && (
            <motion.div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowClearAllConfirm(true)}
                className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                <AnimatedText>{t.deleteAll}</AnimatedText>
              </Button>
            </motion.div>
          )}
        </motion.div>
        
        <motion.div 
          initial={{ y: -10 }}
          animate={{ y: 0 }}
          className="flex mb-8"
        >
          <Input
            type="text"
            placeholder={t.addPlaceholder}
            value={newTodo}
            onChange={handleInputChange}
            className="flex-grow mr-2"
          />
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button onClick={addTodo}>
              <Plus className="h-4 w-4 mr-2" />
              <AnimatedText>{t.addTodo}</AnimatedText>
            </Button>
          </motion.div>
        </motion.div>

        <AnimatePresence mode="popLayout">
          <div className="space-y-4">
            {todos.map((todo, index) => (
              <motion.div
                key={todo.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { delay: index * 0.1 } // Aggiunge un effetto a cascata
                }}
                exit={{ 
                  opacity: 0, 
                  x: -100,
                  transition: { duration: 0.2 }
                }}
                whileHover={{ scale: 1.02 }}
                className={`flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg shadow ${
                  todo.completed ? 'opacity-60' : ''
                }`}
              >
                <div className="flex items-center">
                  <Checkbox
                    id={`todo-${todo.id}`}
                    checked={todo.completed}
                    onCheckedChange={() => toggleTodo(todo.id)}
                    className="mr-2"
                  />
                  <motion.label
                    animate={{
                      textDecoration: todo.completed ? 'line-through' : 'none',
                      opacity: todo.completed ? 0.6 : 1
                    }}
                    htmlFor={`todo-${todo.id}`}
                    className="text-gray-800 dark:text-gray-200"
                  >
                    {todo.text}
                  </motion.label>
                </div>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteTodo(todo.id)}
                    className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      </div>
      
      {/* Footer con animazione */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="w-full py-4 text-center text-gray-600 dark:text-gray-400"
      >
        <motion.a 
          whileHover={{ scale: 1.05 }}
          href="https://github.com/devchristian1337"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 hover:text-gray-800 dark:hover:text-gray-200 transition-colors leading-none"
        >
          <span className="relative top-[1px]">Made by devchristian1337</span>
          <Github className="h-5 w-5" strokeWidth={1.5} />
        </motion.a>
      </motion.div>
      
      {todoToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div 
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full mx-4"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              <AnimatedText>{t.confirmDelete}</AnimatedText>
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              <AnimatedText>
                {t.confirmDeleteMessage} "{todoToDelete.text}"?
              </AnimatedText>
            </p>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setTodoToDelete(null)}>
                <AnimatedText>{t.cancel}</AnimatedText>
              </Button>
              <Button variant="destructive" onClick={confirmDelete}>
                <AnimatedText>{t.delete}</AnimatedText>
              </Button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Modal per conferma eliminazione di tutto */}
      {showClearAllConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div 
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full mx-4"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              <AnimatedText>{t.confirmDelete}</AnimatedText>
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              <AnimatedText>{t.deleteAllMessage}</AnimatedText>
            </p>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowClearAllConfirm(false)}>
                <AnimatedText>{t.cancel}</AnimatedText>
              </Button>
              <Button variant="destructive" onClick={clearAllTodos}>
                <AnimatedText>{t.deleteAllButton}</AnimatedText>
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  )
}