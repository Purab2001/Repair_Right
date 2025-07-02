import { useState, useMemo, useRef, useEffect } from 'react'

export const useSearch = (data = [], searchFields = [], options = {}) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [debouncedTerm, setDebouncedTerm] = useState('')
    const debounceTimeout = useRef(null)

    const {
        caseSensitive = false,
        exactMatch = false,
        debounceMs = 0
    } = options

    const fieldsArray = useMemo(() => {
        if (!searchFields || (Array.isArray(searchFields) && searchFields.length === 0)) {
            if (data.length > 0) {
                return Object.keys(data[0])
            }
            return []
        }
        return Array.isArray(searchFields) ? searchFields : [searchFields]
    }, [searchFields, data])

    useEffect(() => {
        if (debounceMs > 0) {
            if (debounceTimeout.current) clearTimeout(debounceTimeout.current)
            debounceTimeout.current = setTimeout(() => {
                setDebouncedTerm(searchTerm)
            }, debounceMs)
            return () => clearTimeout(debounceTimeout.current)
        } else {
            setDebouncedTerm(searchTerm)
        }
    }, [searchTerm, debounceMs])

    const filteredData = useMemo(() => {
        if (!debouncedTerm.trim()) return data

        const searchValue = caseSensitive ? debouncedTerm : debouncedTerm.toLowerCase()

        return data.filter(item => {
            return fieldsArray.some(field => {
                const value = field.split('.').reduce((obj, key) => obj?.[key], item)

                if (value === undefined || value === null) return false

                const fieldValue = caseSensitive ? String(value) : String(value).toLowerCase()

                return exactMatch
                    ? fieldValue === searchValue
                    : fieldValue.includes(searchValue)
            })
        })
    }, [data, debouncedTerm, fieldsArray, caseSensitive, exactMatch])

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value)
    }

    const clearSearch = () => {
        setSearchTerm('')
    }

    const resetSearch = () => {
        setSearchTerm('')
    }

    return {
        searchTerm,
        setSearchTerm,
        filteredData,
        handleSearchChange,
        clearSearch,
        resetSearch,
        hasResults: filteredData.length > 0,
        resultCount: filteredData.length,
        isSearching: Boolean(debouncedTerm.trim())
    }
}

export default useSearch
