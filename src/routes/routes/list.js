import { getAllRoutes, getListOfRegions, getListOfSeasons } from '../../models/model.js';

export default async (req, res) => {
    const regions = await getListOfRegions();
    const { region, season } = req.query;
    const routes = (await getAllRoutes()).filter(route => {
        const matchesRegion = !region || region === 'all' || route.region === region;
        const matchesSeason = !season || season === 'all' || route.bestSeason === season;
        return matchesRegion && matchesSeason;
    });
    const seasons = await getListOfSeasons();

    res.render('routes/list', {
        title: 'Scenic Train Routes',
        regions,
        routes,
        seasons
    });
};