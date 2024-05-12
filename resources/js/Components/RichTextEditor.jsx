import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function RichTextEditor({ ...props }) {
    return (
        <ReactQuill
            theme="snow"
            {...props}
        />
    );
}