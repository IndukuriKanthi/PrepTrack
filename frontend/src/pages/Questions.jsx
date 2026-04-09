import React, { useEffect, useState } from "react";
import API from "../services/api";
import { Box, Card, CardContent, Typography, TextField, Button } from '@mui/material';
import Navbar from "../components/Navbar";
import { MenuItem } from "@mui/material";

const Questions = () => {
    const [questions, setQuestions] = useState([]);
    const [newQuestion, setNewQuestion] = useState("");
    const [topic, setTopic] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editQuestion, setEditQuestion] = useState('');
    const [editTopic, setEditTopic] = useState('');
    const [search, setSearch] = useState('');
    const [selectedTopic, setSelectedTopic] = useState('');

    const fetchQuestions = async () => {
        try {
            const res = await API.get("/questions");
            setQuestions(res.data.data);
        } catch (err) {
            console.error(err);
        }
    };
    const handleAdd = async () => {
        try {
            await API.post("/questions", {
                question: newQuestion,
                topic: topic
            });
            setNewQuestion("");
            setTopic("");
            fetchQuestions();
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await API.delete(`/questions/${id}`);
                fetchQuestions();
        } catch (err) {
            console.error(err);
        }
    };


    const handleUpdate = async (id) => {
        try {
            await API.put(`/questions/${id}`, {
            question: editQuestion,
            topic: editTopic
            });

            setEditingId(null);   // exit edit mode
            fetchQuestions();     // refresh
        } catch (err) {
            console.error(err);
        }
    };

    const handleEditClick = (q) => {
        setEditingId(q._id);
        setEditQuestion(q.question);
        setEditTopic(q.topic);
    };

    const filteredQuestions = questions.filter((q) => {
        return (
            q.question.toLowerCase().includes(search.toLowerCase()) &&
            q.topic.toLowerCase().includes(selectedTopic.toLowerCase())
        );
    });

    useEffect(() => {
        fetchQuestions();
    }, []);

    const uniqueTopics = [...new Set(questions.map(q => q.topic))];
    
    return (
        <>
            <Navbar />
            <Box sx={{ maxWidth: 700, margin: "auto", mt: 5 }}>
            <div>
                <Typography variant="h4" sx={{ mb: 3 }}>
                    My Questions
                </Typography>
            {console.log(questions)}

            {/* ADD */}
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <TextField
                label="Question"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
            />

            <TextField
                label="Topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
            />

            <Button variant="contained" onClick={handleAdd}>
                Add
            </Button>
            </Box>

            <hr />

            <Box sx={{ display: "flex", gap: 2, mb: 3 }}>

                <TextField
                    label="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <TextField
                    select
                    label="Filter by Topic"
                    value={selectedTopic}
                    onChange={(e) => setSelectedTopic(e.target.value)}
                    sx={{ minWidth: 200 }}
                >
                    <MenuItem value="">All</MenuItem>

                    {uniqueTopics.map((t, index) => (
                    <MenuItem key={index} value={t}>
                        {t}
                    </MenuItem>
                    ))}
                </TextField>

                <Button
                    variant="outlined"
                    onClick={() => {
                    setSearch('');
                    setSelectedTopic('');
                    }}
                >
                    Clear
                </Button>

            </Box>

            {/* LIST */}
            {questions.length === 0 ? (
                <Typography>No questions yet </Typography>
                ) : (
                filteredQuestions.map((q) => (
                    <Card
                        key={q._id}
                        sx={{
                            mb: 2,
                            p: 1,
                            transition: "0.2s",
                            '&:hover': {
                            boxShadow: 6
                            }
                        }}
                    >
                    <CardContent>

                        {editingId === q._id ? (
                        <>
                            <TextField
                            fullWidth
                            sx={{ mb: 1 }}
                            value={editQuestion}
                            onChange={(e) => setEditQuestion(e.target.value)}
                            />

                            <TextField
                            fullWidth
                            sx={{ mb: 1 }}
                            value={editTopic}
                            onChange={(e) => setEditTopic(e.target.value)}
                            />

                            <Button
                            variant="contained"
                            onClick={() => handleUpdate(q._id)}
                            sx={{ mr: 1 }}
                            >
                            Save
                            </Button>

                            <Button onClick={() => setEditingId(null)}>
                            Cancel
                            </Button>
                        </>
                        ) : (
                        <>
                            <Typography variant="h6" fontWeight="bold">
                                {q.question}
                            </Typography>

                            <Typography color="text.secondary">
                                Topic: {q.topic}
                            </Typography>

                            <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                            <Button
                                variant="outlined"
                                sx={{ mr: 1 }}
                                onClick={() => handleEditClick(q)}
                            >
                                Edit
                            </Button>

                            <Button
                                variant="contained"
                                color="error"
                                onClick={() => handleDelete(q._id)}
                            >
                                Delete
                            </Button>
                            </Box>
                        </>
                        )}

                    </CardContent>
                    </Card>
                ))
                )}

                </div>
                </Box>
        </>
                );}

export default Questions;