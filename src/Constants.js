export const move = { Value: "move", Text: "Move To.." };
export const currentlyReading = { Value: "currentlyReading", Text: "Currently Reading" };
export const wantToRead = { Value: "wantToRead", Text: "Want To Read" };
export const read = { Value: "read", Text: "Read" };
export const none = { Value: "none", Text: "None" };

export const Options = [
    { label: move.Text, value: move.Value },
    { label: currentlyReading.Text, value: currentlyReading.Value },
    { label: wantToRead.Text, value: wantToRead.Value},
    { label: read.Text, value: read.Value },
    { label: none.Text, value: none.Value }
    ];

export const shelves = [currentlyReading, wantToRead, read]