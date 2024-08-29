import { useState } from "react";

export default function Page() {

    const [quote, setQuote] = useState("");

    return(
        <div className="min-h-screen bg-red-200 flex flex-col items-center justify-center align-middle">
            <button onClick={
                () => {
                    // alert("Happy Birthday Jonax!");

                    fetch("https://api.quotable.io/random", {
                        method: "GET"
                    }).then(data => data.json()).then(quote => {
                        // alert(quote["content"]);
                        setQuote(quote["content"]);
                    }).then(() => {
                        fetch("https://api.groupme.com/v3/bots/post", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                "text": "🎂Happy Birthday Jonax!🎂\n\n\"" + quote + "\"\n- Jonax",
                                "bot_id": "1633fd1202f04d912496c5c8ca"
                            })
                        });
                    })
                }
            } className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">🎂Happy Birthday Jonax!🎂</button>
            <p className="text-3xl mt-5 max-w-lg content-center">{quote}</p>
        </div>
    )
}

// export default Page();