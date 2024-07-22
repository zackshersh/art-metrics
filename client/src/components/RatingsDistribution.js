import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as d3 from "d3";

function RatingsDistribution({title, data}) {

    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    const contRef = useRef();

    const BUCKET_PADDING = 1;

    const updateDimmensions = () => {
        let bounds = contRef.current.getBoundingClientRect();
        setWidth(bounds.width);
        setHeight(bounds.height);
    };


    const initialize = () => {
        updateDimmensions();
    };

    const xScale = useMemo(() => {
        return d3.scaleLinear().domain([-1,1]).range([0,width])
    }, [data, width]);

    const buckets = useMemo(() => {
        const bucketGenerator = d3.bin().value((d) => d).domain([-1, 1])
            .thresholds(() => {
                let arr = [];
                let count = 8;
                let step = 2/8;
                for(let i = -1; i <= 1; i += step){
                    arr.push(i);
                }

                console.log(arr);
                return arr;
            })
        return bucketGenerator(data.valueHistory);
    },[xScale])
    console.log(buckets)

    const yScale = useMemo(() => {
        const max = Math.max(...buckets.map((bucket) => bucket?.length));
        return d3.scaleLinear().range([height, 0]).domain([0, max]).nice();
    }, [data, height]);

    useEffect(() => {
        initialize();
    },[])

    return (
        <div className='p-4 border border-red-500'>
            <div className='bg-gray-200 border border-red-500 h-40' ref={contRef}>
                <svg width={width} height={height}>
                    <g>
                        {buckets.map((bucket, i) => {
                            return (
                                <rect key={i} fill={"rgb(200,200,200)"} 
                                    x={xScale(bucket.x0) + BUCKET_PADDING/2}
                                    y={yScale(bucket.length)}
                                    width={xScale(bucket.x1) - xScale(bucket.x0) - BUCKET_PADDING}
                                    height={height - yScale(bucket.length)} />
                            )
                        })}
                    </g>
                </svg>
            </div>
        </div>
    );
}

export default RatingsDistribution;