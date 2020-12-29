import React, {useState, useEffect} from 'react';
import "../css/Feed.css";
import CreateIcon from '@material-ui/icons/Create';
import InputOptions from './InputOptions';
import ImageIcon from '@material-ui/icons/Image';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import EventNoteIcon from '@material-ui/icons/EventNote';
import CalendarViewDayIcon from '@material-ui/icons/CalendarViewDay';
import Post from './Post';
import db from '../firebase';
import firebase from 'firebase';
import { selectUser } from '../features/userSlice';
import {useSelector} from "react-redux";
import FlipMove from "react-flip-move";

function Feed() {

    const user = useSelector(selectUser);
    const[posts, setPosts]  = useState([]);

     //Input message Catch
     const [input, setInput] = useState('')
     // Image URL
     const [photoUrl, setPhotoUrl] = useState('')

    useEffect(() => {
        db.collection('posts')
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) => (
            setPosts(snapshot.docs.map((doc) => ({id: doc.id, data: doc.data()})))
            ));
    }, []);

    const sendPost= e =>{
        e.preventDefault();
        db.collection('posts').add({
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            photoURL:user.photoUrl || "",
            message: input,
            description:user.email
        })

        setInput("");
        setPhotoUrl("");

    }

    return (
        <div className="feed">
            <div className="feed__inputContainer">
                <div className="feed__input">
                    <CreateIcon />
                    <form>
                        <input placeholder= "What's on your mind" value={input} onChange = {e => setInput(e.target.value)}/>
                        <button onClick= {sendPost} type="submit">Send</button>
                    </form>
                </div>
                <div className="feed__inputOptions">
                    <InputOptions Icon={ImageIcon} title="Photo" color= "#70B5F9"/>
                    <InputOptions Icon={SubscriptionsIcon} title="Video" color= "#E7A33E"/>
                    <InputOptions Icon={EventNoteIcon} title="Event" color= "#C0CBCD"/>
                    <InputOptions Icon={CalendarViewDayIcon} title="Write article" color= "#7FC15E"/>
                </div>
            </div>

            <FlipMove>
            {posts.map((post)=> (
                <Post key = {post.id}
                description= {post.data.description}
                photoUrl={post.data.photoUrl}
                name={post.data.name}
                timestamp={post.data.timestamp}
                message ={post.data.message}/>
            ))}
          </FlipMove>
        </div>
    )
}

export default Feed;
