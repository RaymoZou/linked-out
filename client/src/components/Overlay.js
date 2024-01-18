import { useState } from "react";
import { UserContext, storage } from "../App";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { useContext } from "react";
import { v4 } from "uuid";

export default function PostInputContainer(props) {
  // TODO: replace UserContext with import statments
  // console.log(auth);

  const { displayName, photoURL } = useContext(UserContext);
  const { setOverlay, isOpen, uploadPost } = props;

  const handleOutsideClick = () => setOverlay(false);

  return isOpen ? (
    <div onClick={handleOutsideClick}>
      <PostInput
        displayName={displayName}
        photoURL={photoURL}
        setOverlay={setOverlay}
        uploadPost={uploadPost}
      />
    </div>
  ) : null;
}

function PostInput(props) {
  const { photoURL: profileImgURL, displayName, uid } = useContext(UserContext);
  const { setOverlay, uploadPost } = props;
  const [postText, setPostText] = useState("");
  const [postImg, setPostImg] = useState();

  const handleInsideClick = (e) => e.stopPropagation();
  const updatePostText = (e) => setPostText(e.target.value);

  async function postToFirebase(e) {
    e.preventDefault();
    setOverlay(false);
    const { imgURL, imgName } = await getImage(postImg);
    uploadPost(displayName, profileImgURL, postText, uid, imgURL, imgName);
    setPostText("");
  }

  async function getImage(img) {
    if (img) {
      const imgName = img.name + v4();
      const imgRef = ref(storage, `images/${uid}/${imgName}`);
      await uploadBytes(imgRef, postImg);
      const imgURL = await getDownloadURL(imgRef);
      return {
        imgURL: imgURL,
        imgName: imgName
      }
    } else {
      return {
        imgURL: null,
        imgName: null
      };
    }
  }

  return (
    <div
      onClick={handleInsideClick}
    >
      <form>
        <div >
          <div>Create a post</div>
          <button
            onClick={() => setOverlay(false)}
          >
          </button>
        </div>
        <div >
          <img src={profileImgURL} alt="" />
          <div>{displayName}</div>
        </div>
        <div >
          <textarea
            name=""
            id=""
            cols="55"
            rows="10"
            placeholder="What do you want to talk about?"
            onChange={updatePostText}
            value={postText}
          ></textarea>
          <div >
            <div >
              <label  htmlFor="file-upload">
                <input
                  id="file-upload"
                  type="file"
                  onChange={(event) => {
                    setPostImg(event.target.files[0]);
                  }}
                />
              </label>
              {postImg ? postImg.name.substring(0, 9) + "..." : null}
            </div>
            <button
              disabled={postText === ""}
              onClick={postToFirebase}
            >
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
