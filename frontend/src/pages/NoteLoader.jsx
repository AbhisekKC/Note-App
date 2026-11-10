import React from 'react'
import { noteApi } from '@/api/axios'
import { useState, useEffect, useRef } from 'react'
import { BookA, BookOpenCheck, Loader2, ArrowLeft, Search, NotebookPen, Notebook } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import NoteAiAssistant from '@/components/NoteAiAssistant'

function NoteLoader() {
    const [notes, setNotes] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [editingId, setEditingId] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [noteModal, setNoteModal] = useState(false)

    const textAreaRef = useRef(null)

    // Fetch Notes on Load
    useEffect(() => {
        fetchNotes()

    }, [])

    const fetchNotes = async () => {
        setIsLoading(true)
        try {
            const res = await noteApi.get('/all')
            setNotes(res.data.notes || [])
        } catch (error) {
            console.log("Error Fetching notes:", error)
        } finally {
            setTimeout(() => setIsLoading(false), 500)
        }
    }

    // Submitting notes
    const handleSubmit = async (e) => {
        setIsSubmitting(true)
        e.preventDefault()
        if (!title.trim() || !content.trim()) {
            toast.warning('Title and note section cannot be empty!!!', {
                description: 'Please write something inside the title and note body',
                position: 'top-right'
            })
        }
        else {
            try {
                if (editingId) {
                    await noteApi.put(`/update/${editingId}`, { title, content })
                    toast.success('Note Updated successfully!!!', { position: 'top-right' })

                    setEditingId(null)
                } else {
                    await noteApi.post('/create', { title, content })
                    toast.success('Note added successfully!!!', { position: 'top-right' })
                }
                // FIXED: Cleared text correctly instead of putting a blank string space ' '
                setTitle('');
                setContent('');
                setNoteModal(false);
                fetchNotes();
                setTimeout(() => {
                    setIsSubmitting(false)
                }, 1000) // Simulated delay for loader test

            } catch (error) {
                console.log(error)
            }
        }
    }

    // Deleting notes
    const handleDelete = async (note) => {
        const id = note._id || note.id;

        if (!id) {
            console.error("CRITICAL: No valid ID field found on this note object!", note);
            return alert("Could not complete delete: Object ID is missing.");
        }

        if (!window.confirm(`Delete "${note.title}" permanently?`)) return;

        try {
            await noteApi.delete(`/delete/${id}`);
            toast.warning('Note deleted!!!!', {
                position: 'top-right'
            })

            setNotes(prevNotes => prevNotes.filter(n => n._id !== id && n.id !== id));

            // FIXED: Resets edit state if the currently open note gets deleted
            if (editingId === id) {
                setEditingId(null);
                setTitle('');
                setContent('');
            }
        } catch (error) {
            console.error("Delete Error:", error);
        }
    };

    //Filter notes based on search query
    const filteredNotes = notes.filter(note => {
        const query = searchQuery.toLowerCase()
        return (
            note.title?.toLowerCase().includes(query) || note.content?.toLowerCase().includes(query)
        )
    })

    // for auto bullet point in textarea

    const BULLET = '\u2022'; // Unicode for bullet point
    const handleKeyDown = (e) => {
        if (e.key !== 'Enter') return;
        e.preventDefault();

        const { selectionStart: start, selectionEnd: end, value } = e.target;
        const lineStart = value.lastIndexOf('\n', start - 1) + 1;
        const currentLine = value.slice(lineStart, start);
        const isEmptyBullet = currentLine === BULLET || currentLine === `${BULLET} `;

        const replaceStart = isEmptyBullet ? lineStart : start;
        const insertText = isEmptyBullet ? '\n' : `\n${BULLET} `;

        e.target.setRangeText(insertText, replaceStart, end, 'end');
    };




    return (
        <div className="bg-linear-to-l from-green-200 to-white min-h-screen w-full p-5 md:p-5 ">
            <div className='flex flex-row justify-between border-b border-green-200 py-4'>
                <h1 className='text-2xl md:text-3xl  font-bold flex  items-center justify-center gap-4 p-2 '>
                    <BookA className='text-green-600  h-10 w-10 shrink-0' /> <span>Start taking Notes.....
                        <Button className='bg-emerald-600 hover:bg-emerald-700 text-white flex items-center '

                            onClick={() => setNoteModal(true)}
                        ><NotebookPen className='h-10 w-10 font-bold' /> Create...
                        </Button>
                    </span>

                </h1>
                <Button className='shrink-0 ' variant='outline' ><Link className='flex' to={'/'}><ArrowLeft className='w-4 h-4' /> Go back</Link></Button>
            </div>
            {/* Form panel */}
            {noteModal &&
                <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4'>
                    <form

                        onSubmit={handleSubmit}
                        className='w-full  max-w-md bg-white p-4 rounded-xl border border-slate-200 flex flex-col gap-3 shadow-2xl'>
                        <h2>
                            {editingId ?
                                <div className="font-semibold text-xl text-rose-600 flex items-center gap-2">Edit Note.</div> :
                                <div className='font-semibold text-2xl flex items-center gap-2 text-slate-800'><BookOpenCheck /> Create Note.</div>
                            }
                            <Button className='bg-rose-600 hover:bg-rose-700 text-white flex items-center gap-2'

                                onClick={() => setNoteModal(false)}
                            >
                                Close <Notebook className='h-10 w-10' />
                            </Button>

                        </h2>
                        <Input
                            type='text'
                            placeholder='Title'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <textarea
                            ref={textAreaRef}
                            placeholder='Content.....'
                            rows='6'
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full h-64 min-h-64 p-3 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500/20 resize-y bg-slate-50 shadow-inner"
                            onKeyDown={handleKeyDown}
                        />
                        <Button
                            type='submit'
                            className={`w-full text-white font-medium ${editingId ? 'bg-rose-600 hover:bg-rose-700' : 'bg-emerald-600 hover:bg-emerald-700'}`}>
                            {isSubmitting ? (
                                <Loader2 className='animate-spin h-4 w-4 mr-2 text-white' />
                            ) : null}
                            {editingId ? 'Update' : 'Add'}
                        </Button>
                        {editingId &&
                            <Button
                                type='button'
                                variant="ghost"
                                className='text-xs text-slate-500 underline hover:bg-slate-100'
                                onClick={() => { setEditingId(null); setContent(''); setTitle(''); setNoteModal(false) }}
                            >Cancel</Button>
                        }
                    </form>
                </div>
            }




            {/* FIXED: Added main layout wrappers for better sidebar layout structuring */}
            <div className='flex flex-col md:flex-row gap-6 max-w-none w-full items-start p-2'>

                {/* Grid Feed workspace */}
                <div className="flex-1 w-full">
                    <h1 className="text-xl font-bold mb-4 text-slate-700">Workspace with your notes: {notes.length}</h1>

                    {/* Search input field wrapper */}
                    <div className='relative w-full md:w-xl flex items-center'>
                        <Search className='absolute left-3 w-4 h-4 text-slate-400 pointer-events none' />
                        <Input
                            type='text'
                            placeholder='search notes....'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className='pl-9 pr-8 bg-white focus-visible:ring-emerald-500 w-full' />
                        {/* Clear button*/}
                        {
                            searchQuery && (
                                <Button
                                    type='button'
                                    onClick={() => setSearchQuery('')}
                                    className='absolute right-0.5  rounded-s-xs  hover:bg-rose-800' >
                                    Clear
                                </Button>
                            )
                        }

                    </div>

                    {isLoading ? (
                        <div className="flex justify-center p-12">
                            <Loader2 className='animate-spin h-8 w-8 text-green-600' />
                        </div>
                    ) : (
                        // FIXED: Removed restrictive grid height parameters so elements align fluidly
                        <div className='grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 h-full w-full p-2'>
                            {filteredNotes.length === 0 ?
                                <h1 className='flex items-center text-center justify-center font-bold text-xl font-serif'>
                                    No notes where found in  the cloud...
                                    <Button className='bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xl flex items-center '

                                        onClick={() => setNoteModal(true)}
                                    ><NotebookPen className='h-10 w-10' /> Get Started...
                                    </Button>
                                </h1>
                                :
                                ([...filteredNotes]
                                    .sort((a,b)=> new Date(b.updatedAt) - new Date(a.updatedAt))
                                    .map(n => (
                                    <div key={n._id || n.id} className='bg-white border border-slate-200 rounded-xl p-4 pr-6 shadow-sm flex flex-col justify-between '>
                                        <div>
                                            {/* ✨ Updated Title (h2) */}
                                            <h2 className='text-lg font-bold text-slate-900 tracking-tight leading-snug line-clamp-2'>
                                                {n.title}
                                            </h2>

                                            {/* ✨ Updated Content (p) */}
                                            <p className='text-sm text-slate-600 border rounded-lg border-indigo-100 border-l-4 border-l-green-500 leading-relaxed mt-3 p-3 whitespace-pre-wrap wrap-break-word'>
                                                <span className='block text-[10px] font-bold uppercase tracking-wider text-green-600 mb-1'>
                                                        ✨ Your notes
                                                    </span>
                                                {n.content}
                                            </p>
                                            {/* ✨ Styled AI Summary Callout Box */}
                                            {n.summary && n.summary.trim() !== '' && (
                                                <div className='mt-3 p-3 bg-indigo-50/60 border border-indigo-100 border-l-4 border-l-indigo-500 rounded-lg'>
                                                    <span className='block text-[10px] font-bold uppercase tracking-wider text-indigo-600 mb-1'>
                                                        ✨ AI Summary
                                                    </span>
                                                    <p className='text-xs text-slate-700 leading-relaxed whitespace-pre-line'>
                                                        {n.summary}
                                                    </p>
                                                </div>
                                            )}

                                            {/* 🏷️ Styled AI Tags Pill List */}
                                            {n.tags && n.tags.length > 0 && (
                                                <div className='flex flex-wrap gap-1.5 mt-3'>
                                                    {n.tags.map((tag, index) => (
                                                        <span
                                                            key={index}
                                                            className='px-2.5 py-0.5 text-[11px] font-medium bg-slate-100 text-slate-600 border border-slate-200 rounded-full'
                                                        >
                                                            #{tag.toLowerCase()}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        <div className='mt-4 flex justify-between border-t border-slate-100 pt-2 text-xs font-medium'>
                                            <div className='flex flex-col  gap-1'>
                                                <span>
                                                    <span>🗓️Created:</span>  {new Date(n.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                                                </span>

                                                <span>
                                                    <span>🔄Updated:</span>  {new Date(n.updatedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                                                </span>

                                            </div>
                                            {/* FIXED: Added edit and delete buttons with proper handlers and styling*/}
                                            <div className='flex justify-end gap-2' >
                                                <Button
                                                    type="button"
                                                    onClick={() => { setIsModalOpen(true); setEditingId(n._id || n.id); setTitle(n.title); setContent(n.content); }}
                                                    className='bg-indigo-50 text-slate-700 hover:bg-indigo-100 shadow-none'>

                                                    ✨AI.
                                                </Button>

                                                <Button
                                                    type="button"
                                                    className='bg-green-50 text-green-700 hover:bg-green-100 shadow-none'
                                                    onClick={
                                                        () => {
                                                            setEditingId(n._id || n.id); setTitle(n.title); setContent(n.content); setNoteModal(true);
                                                            if (textAreaRef.current) {
                                                                textAreaRef.current.focus();
                                                                textAreaRef.current.scrollIntoView({ behaviour: 'smooth', block: 'center' });
                                                            }

                                                        }}>
                                                    Edit
                                                </Button>
                                                <Button
                                                    type="button"
                                                    className='bg-rose-50 text-rose-700 hover:bg-rose-100 shadow-none'
                                                    onClick={() => handleDelete(n)}>
                                                    Delete
                                                </Button>

                                            </div>

                                        </div>
                                        {/* AI Summary Modal */}
                                        {isModalOpen && (
                                            <NoteAiAssistant
                                                activeNoteId={editingId}
                                                noteTitle={title}
                                                onClose={() => { setIsModalOpen(false); setEditingId(null); setTitle(''); setContent(''); }}
                                            />
                                        )}

                                    </div>


                                )))}
                        </div>
                    )}

                </div>

            </div>
        </div>
    )
}

export default NoteLoader;
