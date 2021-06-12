import { React, useState } from 'react';
import Dropzone from '../components/Dropzone'
import { FiExternalLink } from "react-icons/fi";
import { VscLoading } from "react-icons/vsc";

export default function Image_map() {
    const [image, setImage] = useState(null);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const onResetHandler = () => {
        setImage(null);
        setResult(null);
      };
      const onPredictHandler = () => {
        // console.log(image);
        // TODO
    
        const url = "http://localhost:5000/predict";
        setLoading(true);
        fetch(url, {
          method: "POST",
          body: JSON.stringify(image.split(",")[1]),
          headers: new Headers({
            "Content-Type": "application/json",
          }),
        })
          .then((res) => res.json())
          .catch((error) => console.error("Error:", error))
          .then((response) => {
            console.log("Success:", response.result[0]);
            setResult(
              response.result[0]
                .sort(function (a, b) {
                  return b[1] - a[1];
                })
                .slice(0, 3)
            );
            setLoading(false);
          });
      };

    return(
        <>
            <div className="mt-4 w-full">
                {!image && <Dropzone setImage={setImage} />}
                {image && !result && !loading && (
                    <>
                    <p className="text-sm uppercase font-medium mb-2">
                        👇 your image
                    </p>
                    <img className="rounded-md w-full" src={image} />
                    </>
                )}
                {loading && (
                    <>
                    <VscLoading className="my-4 mx-auto text-gray-500 text-3xl animate-spin" />
                    </>
                )}
                {result && !loading && (
                    <>
                    <div className="flex gap-4">
                        <div className="w-4/12">
                        <img className="rounded-md w-full" src={image} />
                        </div>
                        <div className="flex flex-col justify-between w-8/12">
                        {result.map((result, index) => (
                            <div className="flex justify-between">
                            
                                <FiExternalLink />
                            </div>
                        ))}
                        </div>
                    </div>
                    </>
                )}
            </div>  
        <div className="flex ml-auto mt-4 gap-2">
        <button
          type="button"
          onClick={onResetHandler}
          class="w-24 transition duration-200 text-md bg-gray-400 rounded-md p-1 items-center justify-center text-white hover:bg-gray-300 focus:outline-none"
        >
          Reset
        </button>
        {!result && !loading && (
          <button
            type="button"
            onClick={onPredictHandler}
            class="w-24 transition duration-200 text-md bg-yellow-400 rounded-md p-1 items-center justify-center text-white hover:bg-yellow-300 focus:outline-none"
          >
            Predict!
          </button>
        )}
        </div>
      </>
    )
}