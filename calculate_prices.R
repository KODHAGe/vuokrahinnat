install.packages("tidyverse")
install.packages("rgdal", type = "source", configure.args = "--with-gdal-config=/Library/Frameworks/GDAL.framework/Versions/1.11/unix/bin/gdal-config --with-proj-include=/Library/Frameworks/PROJ.framework/unix/include --with-proj-lib=/Library/Frameworks/PROJ.framework/unix/lib")
if(!require(devtools)) install.packages("devtools")
devtools::install_github("kassambara/ggcorrplot")
devtools::install_github("dkahle/ggmap")
devtools::install_github("rstudio/leaflet")
devtools::install_github("bhaskarvk/leaflet.extras")

# Load libraries
library(tidyverse)
library(ggplot2)
library(ggcorrplot)
library(ggmap)
library(geosphere)
library(devtools)
library(jsonlite)
library(leaflet)
library(leaflet.extras)
library(htmlwidgets)

# Register Google API
register_google(key = Sys.getenv("GMAPS_KEY"), account_type = "premium", day_limit = 100000)

# Load data, calculate The Interesting Value, aka €/sqm
price_data <- read_csv("data/vuokraovi_prices_2.csv", locale = locale(encoding = "UTF-8"))
price_data$rent_per_sqm <- as.numeric(price_data$rent) / as.numeric(price_data$size)

# Calculate some averages because why not
area_averages <- aggregate(price_data$rent_per_sqm, list(price_data$municipality), mean)
company_averages <- aggregate(price_data$rent_per_sqm, list(price_data$rental_service), mean)

# Get some latlons from ggmap
price_data$geo <- geocode(paste(price_data$street_address, paste(price_data$postal_code, price_data$municipality), sep=", "))
price_data$mun_geo <- geocode(paste(price_data$municipality, "Finland", sep=", ")) #Incredibly inefficient, this

# Split geo into two columns
price_data$lat <- price_data$geo[,1]
price_data$lon <- price_data$geo[,2]
price_data$mun_lat <- price_data$mun_geo[,1]
price_data$mun_lon <- price_data$mun_geo[,2]

# Calculate map distances
price_data$geodistance_m <- distGeo(cbind(as.numeric(price_data$lat), as.numeric(price_data$lon)), cbind(as.numeric(price_data$mun_lat), as.numeric(price_data$mun_lon)))
hel <- c(24.93838, 60.16986)
price_data$distance_to_hel <- distGeo(cbind(as.numeric(price_data$lat), as.numeric(price_data$lon)), hel)

# Calculate some municipal averages
mun_average <- aggregate(price_data[,c("size","geodistance_m", "rent","rent_per_sqm")], list(price_data$municipality), mean, na.rm = TRUE)
names(mun_average) <- c("municipality", "avg_size", "avg_geodistance", "avg_rent", "avg_rent_per_sqm")
price_data <- merge(price_data, mun_average, by="municipality")
price_data$diff_to_avg_price <- as.numeric(price_data$rent) - as.numeric(price_data$avg_rent)
price_data$diff_to_avg_price_per_sqm <- as.numeric(price_data$rent_per_sqm) - as.numeric(price_data$avg_rent_per_sqm)

# Draw
finland <- get_map(location = "Finland", source = "google", maptype = "roadmap", crop = FALSE, zoom = 6)
helsinki <- get_map(location = "Helsinki", source = "google", maptype = "roadmap", crop = FALSE, zoom = 10)
ggmap(helsinki) + geom_density2d(data = price_data, 
  aes(x = lat, y = lon), size = 0.3) + stat_density2d(data = price_data,
  aes(x = lat, y = lon, fill = ..level.., alpha = ..level..),
  size = 0.01,
  bins = 16,
  geom = "polygon") + scale_fill_gradient(low = "green", high = "red") + scale_alpha(range = c(0, 0.6), guide = FALSE)

# Data analysis things
keeps_for_lm <- c("rent", "size", "build_year", "rent_per_sqm", "geodistance_m", "distance_to_hel", "diff_to_avg_price", "diff_to_avg_price_per_sqm")
sub_lm <- price_data[keeps_for_lm]
corr_matrix <- cor(na.omit(sub_lm))
p.mat <- cor_pmat(sub_lm)
corrplot(corr_matrix, method="square")
ggcorrplot(corr_matrix, p.mat = p.mat, hc.order = TRUE, type = "lower", insig = "blank")

ggplot(sub_lm, aes(y=diff_to_avg_price_per_sqm, x=geodistance_m)) + 
  geom_point()+
  geom_smooth(method=lm)
ggplot(sub_lm, aes(y=diff_to_avg_price_per_sqm, x=geodistance_m)) + 
  geom_point()+
  geom_smooth()

# Drawing maps
keeps_for_map <- c("street_address" ,"lat", "lon", "rent", "size", "build_year", "rent_per_sqm", "geodistance_m", "distance_to_hel", "diff_to_avg_price", "diff_to_avg_price_per_sqm")
sub_for_map <- price_data[keeps_for_map]

leaflet(subsub) %>% addProviderTiles(providers$CartoDB.DarkMatter) %>%
  addWebGLHeatmap(lng=~lat, lat=~lon, intensity = ~diff_to_avg_price_per_sqm, size = 20000)

pal <- colorQuantile(
  palette = c("#F06292", "#26C6DA"),
  domain = sub_for_map$diff_to_avg_price_per_sqm)

map <- leaflet(data = sub_for_map) %>% addProviderTiles(providers$CartoDB.Positron) %>%
  addCircleMarkers(lat = ~lon,
             lng = ~lat,
             radius = 8,
             color = ~pal(diff_to_avg_price_per_sqm),
             popup = ~as.character(paste(street_address, size)), 
             label = ~as.character(street_address),
             stroke = FALSE,
             fillOpacity = 0.7) %>%
             suspendScroll()

# flatten & export
flat <- flatten(price_data, TRUE)
json <- toJSON(flat, pretty=TRUE)
write(json, "data/price_data_out.json")
write.csv(flat, file="data/price_data_out.csv")

saveWidget(map, file="index.html")

# export json to some nice database 


