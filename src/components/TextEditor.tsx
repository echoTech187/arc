import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { Delta, EmitterSource } from 'quill';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });
import 'react-quill-new/dist/quill.snow.css';
interface QuillEditorProps {
    value: string;
    onChange: (content: string) => void;
}
export enum Mode {
    EDIT = 'edit',
    CREATE = 'create'
}
const TextEditor = ({ value, onChange }: QuillEditorProps) => {
    const [editorValue, setEditorValue] = useState(value || '');

    useEffect(() => {
        setEditorValue(value);
    }, [value]);

    const handleChange = (content: string, delta: Delta, source: EmitterSource, editor: any) => {
        setEditorValue(content);
        if (onChange) {
            onChange(content);
        }
    };

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image'],
            ['clean']
        ],
    };

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'indent',
        'link', 'image'
    ];

    return (
        <div style={{ height: '100px' }} className="appearance-none block w-full  text-gray-700  rounded mb-3 leading-tight focus:outline-none " >
            <ReactQuill
                theme="snow"
                placeholder="Write job description..."
                value={editorValue}
                onChange={handleChange}
                modules={modules}
                formats={formats}
                style={{ height: '100px' }}
            />

            <textarea
                className="border p-4 rounded bg-gray-50 hidden"
                id='description'
                name='description'
                required
                value={editorValue} onChange={(e) => setEditorValue(e.target.value)} />
        </div>
    );
};

export default TextEditor;