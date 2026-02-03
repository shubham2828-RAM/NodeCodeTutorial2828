const fs = require('fs');
// sync way to create a file
fs.writeFileSync('./text.txt', 'This is a sample text file.');
console.log("File created successfully.");

// async way to create a file
fs.writeFile('./asyncText.txt', 'This is an async sample text file.', (err) => {
    if (err) {
        console.error("Error creating file:", err);
        return;
    }
    console.log("Async file created successfully.");
});
// async way do not return anything, so we use a callback to notify when the file is created

// read a file sync way
const data = fs.readFileSync('./text.txt', 'utf8');
console.log("File content (sync):", data); // at this point I notic one thing, async read run first then writefile run. 

// sync way to append data to a file
// fs.appendFileSync('./text.txt', 'Testing append file sync way.\n'); // commented to avoid multiple appends on multiple runs