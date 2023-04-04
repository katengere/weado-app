let projects = [
    { year: 2014, title: 'project 1', content: 'project 1 content', date: new Date(2014, 1, 5) },
    { year: 2014, title: 'project 2', content: 'project 2 content', date: new Date(2014, 2, 15) },
    { year: 2015, title: 'project 1', content: 'project 1 content', date: new Date(2015, 1, 5) },
    { year: 2015, title: 'project 2', content: 'project 2 content', date: new Date(2015, 5, 25) },
    { year: 2016, title: 'project 1', content: 'project 1 content', date: new Date(2016, 10, 6) },
    { year: 2016, title: 'project 2', content: 'project 2 content', date: new Date(2016, 11, 12) },
    { year: 2016, title: 'project 3', content: 'project 3 content', date: new Date(2016, 6, 21) },
    { year: 2017, title: 'project 1', content: 'project 1 content', date: new Date(2017, 4, 9) },
    { year: 2017, title: 'project 2', content: 'project 2 content', date: new Date(2017, 8, 8) },
    { year: 2018, title: 'project 1', content: 'project 1 content', date: new Date(2018, 7, 17) }
];

function ctrlProjects(req, res, next) {
    res.status(200).json(projects);
}

function ctrlProject(req, res, next) {
    const year = req.params.year;
    const project = projects.find(project => project.year == year);
    console.log(project);
    res.status(200).json(project);
}
module.exports = { ctrlProjects, ctrlProject };