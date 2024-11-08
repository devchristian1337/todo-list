'use client'

import { motion } from 'framer-motion'
import { Sun, Moon, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { translations, languages } from '@/lib/translations'
import { useState, Dispatch, SetStateAction } from 'react'
import { Squash as Hamburger } from 'hamburger-react'

type HamburgerMenuProps = {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  darkMode: boolean
  setDarkMode: (darkMode: boolean) => void
  language: string
  setLanguage: (language: string) => void
}

type MenuSection = 'theme' | 'language' | null;

export function HamburgerMenu({
  isOpen,
  setIsOpen,
  darkMode,
  setDarkMode,
  language,
  setLanguage
}: HamburgerMenuProps) {
  const [expandedSection, setExpandedSection] = useState<MenuSection>(null)
  const t = translations[language]

  const toggleSection = (section: MenuSection) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  return (
    <div className="md:hidden">
      <div className="z-50 relative">
        <Hamburger 
          toggled={isOpen} 
          toggle={setIsOpen}
          color={darkMode ? "#fff" : "#000"}
          duration={0.3}
          size={20}
        />
      </div>

      <motion.div
        className="fixed inset-0 bg-white dark:bg-gray-900 z-40 p-6"
        initial={{ x: "100%" }}
        animate={{
          x: isOpen ? "0%" : "100%"
        }}
        transition={{
          type: "tween",
          duration: 0.25,
          ease: "easeInOut"
        }}
      >
        <div className="flex flex-col h-full pt-16 space-y-4">
          {/* Tema */}
          <div className="border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => toggleSection('theme')}
              className="flex justify-between items-center w-full py-4 text-gray-800 dark:text-gray-200"
            >
              <span className="text-lg font-semibold">{t.theme}</span>
              <motion.div
                animate={{ rotate: expandedSection === 'theme' ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="h-5 w-5" />
              </motion.div>
            </button>
            <motion.div
              initial={false}
              animate={{
                height: expandedSection === 'theme' ? "auto" : 0,
                opacity: expandedSection === 'theme' ? 1 : 0
              }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="flex items-center space-x-4 pb-4">
                <Button
                  variant={!darkMode ? "default" : "outline"}
                  onClick={() => setDarkMode(false)}
                  className="flex-1 justify-start"
                >
                  <Sun className="h-4 w-4 mr-2" />
                  {t.lightMode}
                </Button>
                <Button
                  variant={darkMode ? "default" : "outline"}
                  onClick={() => setDarkMode(true)}
                  className="flex-1 justify-start"
                >
                  <Moon className="h-4 w-4 mr-2" />
                  {t.darkMode}
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Lingua */}
          <div className="border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => toggleSection('language')}
              className="flex justify-between items-center w-full py-4 text-gray-800 dark:text-gray-200"
            >
              <span className="text-lg font-semibold">{t.language}</span>
              <motion.div
                animate={{ rotate: expandedSection === 'language' ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="h-5 w-5" />
              </motion.div>
            </button>
            <motion.div
              initial={false}
              animate={{
                height: expandedSection === 'language' ? "auto" : 0,
                opacity: expandedSection === 'language' ? 1 : 0
              }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="space-y-2 pb-4">
                {languages.map((lang) => (
                  <Button
                    key={lang.code}
                    variant={language === lang.code ? "default" : "outline"}
                    onClick={() => {
                      setLanguage(lang.code);
                      setIsOpen(false);
                    }}
                    className="w-full justify-start"
                  >
                    <lang.FlagIcon className="h-4 w-4 mr-2" />
                    {lang.name}
                  </Button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
} 