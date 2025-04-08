**Directions**
To run open in VSCODE or IDE > open terminal > cd server > npm i npm run dev
Open a new terminal > cd frontend > npm i npm run dev

This will seed your database and start the project

Go to http://localhost:5173/ in your browser to view the app and use it.

**Notes**
I wanted to set this app up so we could scale as large as we needed. For this I seperated out the files so controllers are in their own folder. Models and DB are also their own folder. This will allow future developers to more easily create more features.
I wanted to make the getDeals to be as effiencent as possible on both FE and BE so I filtered the data on query rather than pulling all data and filtering it on the FE
I wanted the user to have an easy way to clear filters so I added a button to reset.
I thought the user would want to see the start and end dates of the deals.
I wanted to have the ability to order by the column headers on the table so that is a feature.

given more time I would like to add in a log in so we can get the deals by organization. I would add in more detailed filters for start date and end date.

**Assumptions**
I assumed this would be an application that would be used by multiple organizations but as there is not log in for now we default the org id to 1
I assumed 3 status: open, pending, closed based on this assumption I only show one table as if you filter by status and you have multiple tables based on status the filter is irrelevant

**Questions/Comments**
The screenshot made it a bit confusing as far as the values for status of deals and the organzation of the return if there are particlar values you would like this would be nice to know.
If there are certain values it would probably change the way the page would be created.

Thanks!
