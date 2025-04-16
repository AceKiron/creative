import * as faRegular from "@fortawesome/free-regular-svg-icons";
import * as faSolid from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import axios from "axios";
import { useState } from "react";

import { BACKEND_HOST } from "./data";

type Props = {
    idea: {
        title: string;
        description?: string;
        iVoted: boolean;
        votes: number;
        _id: string;
    };
}

export default function Idea({ idea }: Props) {
    const [iVoted, setIVoted] = useState(idea.iVoted);
    const [votes, setVotes] = useState(idea.votes);

    const accessToken = localStorage.getItem("aT");

    function toggleVoted() {
        if (accessToken === null) return;

        axios.patch(`${BACKEND_HOST}/ideas/vote?_id=${idea._id}`, {}, { headers: { Authorization: `Bearer ${accessToken}` } }).then((res) => res.data).then((data) => {
            setIVoted(data.voted);
            
            if (data.voted) setVotes((prev) => prev + 1);
            else setVotes((prev) => prev - 1);
        });
    }

    return (
        <div className="mb-2 mx-4 hover:-translate-y-1 transition-all duration-100">
            <div className="bg-yellow-300 p-2 font-bold">
                {idea.title}
            </div>
            <div className="bg-yellow-100 p-3">
                {idea.description === undefined ? <span className="italic text-center">(No description has been provided)</span> : idea.description}
            </div>
            <div className="bg-orange-200 p-1 text-center" onClick={() => toggleVoted()}>
                {iVoted ? <FontAwesomeIcon icon={faSolid.faHeart} /> : <FontAwesomeIcon icon={faRegular.faHeart} />}
                <span className="ml-2">{votes}</span>
            </div>
        </div>
    );
}