import React from 'react';

    const CreatorList = ({ creators }) => {
      return (
        <ul className="list-disc pl-5">
          {creators.map((creator, index) => (
            <li key={index} className="text-sm">
              {creator.name} - {creator.role}
            </li>
          ))}
        </ul>
      );
    };

    export default CreatorList;
