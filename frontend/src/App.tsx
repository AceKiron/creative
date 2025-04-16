import axios from "axios";
import { useEffect, useState } from "react";

import Idea from "./Idea";
import { BACKEND_HOST } from "./data";

export default function App() {
    const [rerender, setRerender] = useState(false);
    const [ideasElement, setIdeasElement] = useState(<></>);

    useEffect(() => {
        const code = new URLSearchParams(location.search).get("code");
        if (code !== null && localStorage.getItem("aT") === null && localStorage.getItem("uid") === null) {
            (async () => {
                axios.get(`${BACKEND_HOST}/user/login?code=${code}`).then((res) => res.data).then((data) => {
                    if (data.accessToken) {
                        localStorage.setItem("aT", data.accessToken);
                        localStorage.setItem("uid", data._id);
                        setRerender(!rerender);
                    }
                });
            })();
        }
    }, []);

    useEffect(() => {
        const id = localStorage.getItem("uid");
        console.log("Fetch", Date.now(), id);
        axios.get(`${BACKEND_HOST}/ideas?me=${id === null ? 0 : id}`).then((res) => res.data).then((data) => {
            const d = data as any[];
            if (d.length === 0) return;
            const topIdea = d.reduce((max, curr) => curr.votes > max.votes ? curr : max);

            console.log("SetIdeasElement", topIdea);
            setIdeasElement(<>
                <div className="mb-10 p-1 border-b border-white/10">
                    <Idea key={`idea-key-top-${id}`} idea={topIdea} />
                </div>
                {d.filter((idea) => idea !== topIdea).map((idea, key) => <Idea key={`idea-key-${id}-${key}`} idea={idea} />)}
            </>);
        });
    }, [rerender]);

    return (
        <div className="min-h-screen bg-gray-600">
            <div className="grid md:grid-cols-3 gap-3">
                <div className="p-3">
                    {localStorage.getItem("aT") === null ? <>
                        <button onClick={() => location.assign(`${BACKEND_HOST}/user/login-redirect`)} className="bg-gray-800 p-2 w-full font-bold font-mono text-white text-center">
                            Login with GitHub
                        </button>
                    </> : <>
                        <p className="bg-green-700 p-2 w-full font-bold font-mono text-white text-center">
                            You've succesfully logged in!
                        </p>
                    </>}
                </div>
                <div className="p-3 md:col-span-2">
                    {ideasElement}
                </div>
            </div>
        </div>
    );
}